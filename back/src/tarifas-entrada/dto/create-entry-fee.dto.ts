import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEntryFeeDto {
  @IsNumber()
  @IsNotEmpty()
  eventoId!: number;

  @IsNumber()
  @IsNotEmpty()
  sectorId!: number;

  @IsNumber()
  @IsNotEmpty()
  monto!: number;
}

export { CreateEntryFeeDto as CreateTarifaEntradaDto };

