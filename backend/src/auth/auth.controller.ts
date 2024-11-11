import { Controller, Post, Body, HttpCode, HttpStatus, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../user/login.dto';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: [{ field: 'general', message: 'Invalid credentials' }],
        error: 'Unauthorized'
      });
    }
    const result = await this.authService.login(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      ...result
    };
  }
}
