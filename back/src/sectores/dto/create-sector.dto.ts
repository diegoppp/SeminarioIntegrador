import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSectorDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  @IsNotEmpty()
  capacidad!: number;
}

export { CreateSectorDto as CreateSectorsDto };


