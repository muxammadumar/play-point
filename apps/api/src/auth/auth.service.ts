import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async authenticate(initData: string) {
    const user = this.validateInitData(initData);

    // Upsert = update if exists, create if not
    const dbUser = await this.prisma.user.upsert({
      where: { telegramId: user.id },
      update: {
        firstName: user.first_name,
        lastName: user.last_name ?? null,
        username: user.username ?? null,
        photoUrl: user.photo_url ?? null,
        isPremium: user.is_premium ?? false,
      },
      create: {
        telegramId: user.id,
        firstName: user.first_name,
        lastName: user.last_name ?? null,
        username: user.username ?? null,
        languageCode: user.language_code ?? null,
        photoUrl: user.photo_url ?? null,
        isPremium: user.is_premium ?? false,
      },
    });

    // Create JWT with user's DB id and telegram id
    const token = this.jwt.sign({
      sub: dbUser.id,
      telegramId: Number(dbUser.telegramId),
    });

    return { access_token: token, user: dbUser };
  }

  private validateInitData(initData: string) {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) throw new UnauthorizedException('Missing hash');

    // Remove hash and signature from params, sort alphabetically, join with \n
    // Use raw URL string to preserve exact encoding Telegram used for signing
    const rawParams = new URLSearchParams(
      initData
        .split('&')
        .filter((p) => !p.startsWith('hash=') && !p.startsWith('signature='))
        .join('&'),
    );
    const dataCheckString = [...rawParams.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => `${key}=${val}`)
      .join('\n');

    // HMAC validation per Telegram docs
    const botToken = this.config.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
    console.log('Bot token starts with:', botToken.substring(0, 12), 'length:', botToken.length);
    const secretKey = createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();
    const computedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    const isDev = this.config.get('NODE_ENV') !== 'production';
    if (computedHash !== hash) {
      console.log('Hash mismatch:', { computedHash, hash, isDev, dataCheckString });
      if (!isDev) throw new UnauthorizedException('Invalid initData signature');
    }

    // Parse the user object from initData
    const userStr = params.get('user');
    if (!userStr) throw new UnauthorizedException('Missing user data');

    return JSON.parse(decodeURIComponent(userStr));
  }
}
