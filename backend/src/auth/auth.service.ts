import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Validate the user
  async validateUser(email: string, password: string): Promise<any> {
    return this.userService.validateUser(email, password);
  }

  // Login
  async login(user: any) {
    const payload = { email: user.email, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone || null
      }
    };
  }
}
