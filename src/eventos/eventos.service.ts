import { Inject, Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { EventoEntity } from './entities/evento.entity';
import { EVENTOS_REPOSITORY } from './repositories/eventos.repository';
import type { EventosRepository } from './repositories/eventos.repository';

@Injectable()
export class EventosService {
  constructor(
    @Inject(EVENTOS_REPOSITORY)
    private readonly eventosRepository: EventosRepository,
  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<EventoEntity> {
    return this.eventosRepository.create(createEventoDto);
  }

  async findAll(): Promise<EventoEntity[]> {
    return this.eventosRepository.findAll();
  }

  async findOne(id: number): Promise<EventoEntity | null> {
    return this.eventosRepository.findOne(id);
  }

  async update(id: number, updateEventoDto: UpdateEventoDto): Promise<EventoEntity | null> {
    return this.eventosRepository.update(id, updateEventoDto);
  }

  async remove(id: number): Promise<EventoEntity | null> {
    return this.eventosRepository.remove(id);
  }
}
