import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './users.entity';
import { error } from 'console';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(password: string, email: string) {
    const user = this.repo.create({ password, email });
    return this.repo.save(user);
  }

  findOne(idValue: number) {
    return this.repo.findOne({
      where: {
        id: idValue,
      },
    });
  }

  find(email: string) {
    return this.repo.find({
      where: {
        email: email,
      },
    });
  }
  async update(id: number, attr: Partial<User>) {
    console.log('attr', attr);
    const user = await this.findOne(id);
    console.log('user', user);
    if (!user) {
      return new error('user not found');
    }
    Object.assign(user, attr);
    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      return new error('no user found');
    }
    return this.repo.remove(user);
  }
}
