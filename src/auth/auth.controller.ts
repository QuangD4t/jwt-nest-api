import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body('userName') userName: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(userName, password);
  }

  @Get('auth')
  @UseGuards(AuthGuard)
  auth() {
    return {
      message: 'Xác thực JWT thành công',
    };
  }
}   