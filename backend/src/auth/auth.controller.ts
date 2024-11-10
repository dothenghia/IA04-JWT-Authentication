import { Controller, Post, Body, UseGuards, Get, Request, ValidationPipe, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
        user: { id: user._id, username: user.username, email: user.email }
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Registration failed',
        errors: [{ field: error.name, message: error.message }]
      };
    }
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Login failed',
        errors: [{ field: 'email', message: 'Invalid email or password' }]
      };
    }
    const result = await this.authService.login(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      ...result
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found'
      };
    }
    const { password, ...result } = user.toObject();
    return {
      statusCode: HttpStatus.OK,
      message: 'Profile retrieved successfully',
      user: result
    };
  }
}
