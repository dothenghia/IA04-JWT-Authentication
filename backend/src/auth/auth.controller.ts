import { Controller, Post, Body, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from '../user/login.dto';

@Controller('user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    try {
      const user = await this.userService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      return this.authService.login(user);
    } catch (error) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Login failed',
        error: error.message,
      };
    }
  }
}
