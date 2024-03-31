import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { serializer } from '../interceptors/serializer.interceptor';
import { UserDto } from './dtos/users.dto';
import { UsersService } from './users.service';
import { UPdateUserDto } from './dtos/update-user.dro';
import { GetUserDto } from 'src/users/dtos/get-user.dto';
import { AuthService } from './auth.service';
import { HEADERS_METADATA } from '@nestjs/common/constants';
@Controller('users')
@serializer(GetUserDto)
export class UsersController {
  constructor(
    private usersserv: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(
    @Body() body: UserDto,
    @Headers() headers: any,
    @Session() session: any,
  ) {
    const users = await this.authService.signUp(body.email, body.password);

    if (users instanceof BadRequestException) {
      console.log('exception');
      return users; // Return the BadRequestException if it was thrown
    }
    console.log('create user', session);

    session.userId = users.id;
    console.log('user id:', users.id);

    console.log('create user', session);

    return users;
  }
  @Post('signin')
  async signin(@Body() body: UserDto, @Session() session: any) {
    const users = await this.authService.signin(body.email, body.password);
    if (users instanceof BadRequestException) {
      return users; // Return the BadRequestException if it was thrown
    }
  }
  @Get('me')
  getMe(@Session() session: any) {
    return this.usersserv.findOne(session.userId);
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
