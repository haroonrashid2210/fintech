import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { CurrentUser } from '@app/common';
import { User } from '../../src/users/schemas';
import { RegisterDto, VerifyEmailDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('verify-email')
  async verifyEmail(@Res({ passthrough: true }) response: Response, @Body() verifyEmailDto: VerifyEmailDto) {
    return await this.authService.verifyEmail(response, verifyEmailDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res({ passthrough: true }) response: Response, @CurrentUser() user: User) {
    await this.authService.login(user, response);
    response.send(user);
  }
}
