import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt, Hash } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
export class AuthService {
  constructor(private userService: UsersService) {}
  async signUp(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      return new BadRequestException('user already registered');
    }
    // salt
    const salt = randomBytes(8).toString('hex');
    //hash password and salt
    const hash = await scrypt(password, salt, 32);
    //combine hash and salt
    const result = salt + '.' + hash.toString();
  }
  signin() {}
}
