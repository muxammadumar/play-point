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
    // Parse hash from raw string
    const pairs = initData.split('&');
    const hashPair = pairs.find((p) => p.startsWith('hash='));
    if (!hashPair) throw new UnauthorizedException('Missing hash');
    const hash = hashPair.split('=')[1];

    // Build data check string from raw URL-decoded pairs (excluding hash and signature)
    const dataCheckString = pairs
      .filter((p) => !p.startsWith('hash=') && !p.startsWith('signature='))
      .map((p) => {
        const idx = p.indexOf('=');
        const key = p.substring(0, idx);
        const val = decodeURIComponent(p.substring(idx + 1));
        return `${key}=${val}`;
      })
      .sort()
      .join('\n');

    // HMAC validation per Telegram docs
    const botToken = this.config.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
    const secretKey = createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();
    const computedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (computedHash !== hash) {
      console.log('Hash mismatch:', { computedHash, hash, dataCheckString });
      throw new UnauthorizedException('Invalid initData signature');
    }

    // Parse the user object from initData
    const params = new URLSearchParams(initData);
    const userStr = params.get('user');
    if (!userStr) throw new UnauthorizedException('Missing user data');

    return JSON.parse(userStr);
  }
}
