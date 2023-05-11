import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  name: string;
  
  @IsString()
  email: string;
  
  @MinLength(11)
  @IsString()
  phone: string;

  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
