import { PartialType } from '@nestjs/mapped-types';
import { CreateEntryFeeDto } from './create-entry-fee.dto';

export class UpdateEntryFeeDto extends PartialType(CreateEntryFeeDto) {}

export { UpdateEntryFeeDto as UpdateTarifaEntradaDto };

