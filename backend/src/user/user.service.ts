import { Injectable, ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterDto } from './register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email, password, phone } = registerDto;

    // Check if username already exists
    const existingUsername = await this.userModel.findOne({ username }).exec();
    if (existingUsername) {
      throw new ConflictException({
        message: [{ field: 'username', message: 'Username already exists' }],
        error: 'Conflict',
        statusCode: 409
      });
    }

    // Check if email already exists
    const existingEmail = await this.userModel.findOne({ email }).exec();
    if (existingEmail) {
      throw new ConflictException({
        message: [{ field: 'email', message: 'Email already exists' }],
        error: 'Conflict',
        statusCode: 409
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      phone
    });

    try {
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException({
        message: [{ field: 'general', message: 'Invalid input data' }],
        error: 'Bad Request',
        statusCode: 400
      });
    }
  }

  async findAll(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async getUserProfile(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      username: user.username,
      email: user.email,
      phone: user.phone || null
    };
  }
}
