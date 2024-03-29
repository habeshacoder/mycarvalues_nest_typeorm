import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UPdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
}
