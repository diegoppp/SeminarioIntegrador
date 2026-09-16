import { PartialType } from '@nestjs/mapped-types';
import { CreateUbicacionEventoDto } from './create-ubicacion-evento.dto';

export class UpdateUbicacionEventoDto extends PartialType(CreateUbicacionEventoDto) {}
