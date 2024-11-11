import { Controller, Post, Get, Body, HttpCode, HttpStatus, ValidationPipe, UseGuards, Request, ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validationError: { target: false, value: false },
  })) registerDto: RegisterDto) {
    try {
      const user = await this.userService.register(registerDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: `User registered successfully with email ${user.email}`
      };
    } catch (error) {
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error; // Re-throw the exception to let NestJS handle it
      }
      // Handle any other unexpected errors
      throw new BadRequestException({
        message: [{ field: 'general', message: 'An unexpected error occurred' }],
        error: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    try {
      const userProfile = await this.userService.getUserProfile(req.user.email);
      return {
        statusCode: HttpStatus.OK,
        message: 'Profile retrieved successfully',
        user: userProfile
      };
    } catch (error) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: [{ field: 'general', message: 'Unable to retrieve user profile' }],
        error: 'Unauthorized'
      });
    }
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const count = await this.userService.findAll();
    return { count };
  }
}
