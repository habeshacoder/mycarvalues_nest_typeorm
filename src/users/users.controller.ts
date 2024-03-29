import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { serializer } from '../interceptors/serializer.interceptor';
import { UserDto } from './dtos/users.dto';
import { UsersService } from './users.service';
import { UPdateUserDto } from './dtos/update-user.dro';
import { GetUserDto } from 'src/users/dtos/get-user.dto';
import { AuthService } from './auth.service';
@Controller('users')
@serializer(GetUserDto)
export class UsersController {
  constructor(
    private usersserv: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  createUser(@Body() body: UserDto) {
    this.authService.signUp(body.email, body.password);
  }
  @Get()
  find(@Query('email') email: string) {
    return this.usersserv.find(email);
  }
  // @serializer(GetUserDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersserv.findOne(parseInt(id));
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersserv.delete(parseInt(id));
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UPdateUserDto) {
    return this.usersserv.update(parseInt(id), body);
  }
}
