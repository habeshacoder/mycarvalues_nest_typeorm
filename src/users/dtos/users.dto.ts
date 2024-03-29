import { IsEmail, IsString, IsNumber } from 'class-validator';
export class UserDto {
  id: number;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
