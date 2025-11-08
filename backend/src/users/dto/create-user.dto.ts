import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(['admin', 'client'])
  role?: 'admin' | 'client';
}


