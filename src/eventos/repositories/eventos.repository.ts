import { CreateEventoDto } from '../dto/create-evento.dto';
import { UpdateEventoDto } from '../dto/update-evento.dto';
import { EventoEntity } from '../entities/evento.entity';

export const EVENTOS_REPOSITORY = 'EVENTOS_REPOSITORY';

export interface EventosRepository {
  findAll(): Promise<EventoEntity[]>;
  findOne(id: number): Promise<EventoEntity | null>;
  create(data: CreateEventoDto): Promise<EventoEntity>;
  update(id: number, data: UpdateEventoDto): Promise<EventoEntity | null>;
  remove(id: number): Promise<EventoEntity | null>;
}
