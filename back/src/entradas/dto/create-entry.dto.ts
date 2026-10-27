import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEntryDto {
  @IsNumber()
  @IsNotEmpty()
  eventoId!: number;

  @IsNumber()
  @IsNotEmpty()
  sectorId!: number;

  @IsNumber()
  @IsOptional()
  tarifaEntradaId?: number;
}

export { CreateEntryDto as CreateEntradaDto };

