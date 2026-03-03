import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.adminAuthService.login(username, password);
  }
}
