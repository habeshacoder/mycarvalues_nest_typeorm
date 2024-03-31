import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt, Hash } from 'crypto';
import { promisify } from 'util';
import { Injector } from '@nestjs/core/injector/injector';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      return new BadRequestException('user already registered');
    }
    // salt
    const salt = randomBytes(8).toString('hex');
    console.log('salt', salt);

    //hash password and salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    console.log('hash', hash);

    //combine hash and salt
    const result = salt + '.' + hash.toString('hex');
    console.log('result', result);
    const user = await this.userService.create(result, email);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    console.log('user', user);

    if (!user) {
      return new BadRequestException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash == hash.toString('hex')) {
      return user;
    } else {
      return new BadRequestException('wrong password');
    }
  }
}
