import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { CurrentUserInterceptors } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService, CurrentUserInterceptors],
  controllers: [UsersController],
})
export class UsersModule {}
