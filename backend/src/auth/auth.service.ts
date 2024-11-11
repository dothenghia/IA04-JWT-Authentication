import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
