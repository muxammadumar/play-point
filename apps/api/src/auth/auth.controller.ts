import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('telegram')
  async authenticateWithTelegram(@Body('initData') initData: string) {
    return this.authService.authenticate(initData);
  }
}