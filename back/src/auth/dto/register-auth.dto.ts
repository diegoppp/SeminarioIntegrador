import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsOptional()
  @Length(2, 100)
  nombre?: string;

  @Length(2, 100)
  @IsNotEmpty()
  apellido!: string;

  @Length(1, 20)
  @IsNotEmpty()
  dni!: string;

  @IsDateString(
    {},
    {
      message:
        'La fecha de nacimiento debe tener un formato de fecha válido (YYYY-MM-DD)',
    },
  )
  @IsOptional()
  fechaNacimiento?: string;

  @IsString({ message: 'La provincia debe ser un texto' })
  @Length(2, 100)
  @IsOptional()
  provincia?: string;

  @IsString({ message: 'El teléfono debe ser un texto' })
  @Length(1, 30)
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @MinLength(8)
  @IsNotEmpty()
  password!: string;
}
