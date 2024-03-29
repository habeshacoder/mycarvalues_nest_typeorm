import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

export class AuthService {
  constructor(private userService: UsersService) {}
  async signUp(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      return new BadRequestException('user already registered');
    }
  }
  signin() {}
}
