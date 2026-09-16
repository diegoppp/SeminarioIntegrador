import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsDateString()
  @IsNotEmpty()
  fechaHoraInicio!: string;

  @IsDateString()
  @IsNotEmpty()
  fechaHoraFin!: string;

  @IsString()
  @IsNotEmpty()
  estadoEvento!: string;

  @IsString()
  @IsNotEmpty()
  tipoEventoNombre!: string;

  @IsNumber()
  @IsNotEmpty()
  idUbicacion!: number;
}
