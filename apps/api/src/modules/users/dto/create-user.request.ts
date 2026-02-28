import { IsEmail, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
