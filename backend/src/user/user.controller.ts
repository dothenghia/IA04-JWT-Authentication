import { Controller, Post, Get, Body, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validationError: { target: false, value: false },
  })) registerDto: RegisterDto) {
    try {
      const user = await this.userService.register(registerDto);
      return { message: `User registered successfully with email ${user.email}` };
    } catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Registration failed',
          errors: [{ field: error.name, message: error.message }]
        };
      }
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    try {
      return await this.userService.login(loginDto.email, loginDto.password);
    } catch (error) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Login failed',
        error: error.message,
      };
    }
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users.map(user => ({
      username: user.username,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt
    }));
  }
}
