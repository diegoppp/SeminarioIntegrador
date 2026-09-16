import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoreDto } from './create-productore.dto';

export class UpdateProductoreDto extends PartialType(CreateProductoreDto) {}
