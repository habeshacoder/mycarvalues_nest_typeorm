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
import { SerializerInterceptor } from '../interceptors/serializer.interceptor';
import { UserDto } from './dtos/users.dto';
import { UsersService } from './users.service';
import { get } from 'http';
import { UPdateUserDto } from './dtos/update-user.dro';
@Controller('users')
export class UsersController {
  constructor(private usersserv: UsersService) {}

  @Post('signup')
  createUser(@Body() body: UserDto) {
    return this.usersserv.create(body.password, body.email);
  }
  @Get()
  find(@Query('email') email: string) {
    return this.usersserv.find(email);
  }
  @UseInterceptors(SerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('running handler');
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
