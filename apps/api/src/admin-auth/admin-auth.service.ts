import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(username: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwt.sign({ sub: admin.id, role: 'admin' });

    return {
      access_token: token,
      admin: { id: admin.id, username: admin.username, name: admin.name },
    };
  }
}
