import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventoDto } from '../dto/create-evento.dto';
import { UpdateEventoDto } from '../dto/update-evento.dto';
import { EventoEntity } from '../entities/evento.entity';
import { EventosRepository } from './eventos.repository';

@Injectable()
export class TypeOrmEventosRepository implements EventosRepository {
  constructor(
    @InjectRepository(EventoEntity)
    private readonly eventoRepository: Repository<EventoEntity>,
  ) {}

  async findAll(): Promise<EventoEntity[]> {
    return await this.eventoRepository.find();
  }

  async findOne(id: number): Promise<EventoEntity | null> {
    return await this.eventoRepository.findOneBy({ id });
  }

  async create(data: CreateEventoDto): Promise<EventoEntity> {
    const evento = this.eventoRepository.create(data as any);
    return await this.eventoRepository.save(evento);
  }

  async update(id: number, data: UpdateEventoDto): Promise<EventoEntity | null> {
    const evento = await this.eventoRepository.findOneBy({ id });
    if (!evento) return null;

    Object.assign(evento, data);
    return await this.eventoRepository.save(evento);
  }

  async remove(id: number): Promise<EventoEntity | null> {
    const evento = await this.eventoRepository.findOneBy({ id });
    if (!evento) return null;

    await this.eventoRepository.remove(evento);
    return evento;
  }
}
