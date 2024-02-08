import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsEmail(
    { host_blacklist: ['@equipodefensa.com'] },
    { message: 'Debe ser un email válido' },
  )
  email: string;
  password: string;
  avatar: string;
}
