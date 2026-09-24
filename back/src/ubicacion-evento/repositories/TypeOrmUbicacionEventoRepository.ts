import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UbicacionEventoEntity } from '../entities/ubicacion-evento.entity';
import type { UbicacionEventoRepository } from './ubicacion-evento.repository';

@Injectable()
export class TypeOrmUbicacionEventoRepository implements UbicacionEventoRepository {
  constructor(
    @InjectRepository(UbicacionEventoEntity)
    private readonly ubicacionRepository: Repository<UbicacionEventoEntity>,
  ) {}

  findAll(): Promise<UbicacionEventoEntity[]> {
    return this.ubicacionRepository.find();
  }

  async findOne(id: number): Promise<UbicacionEventoEntity | null> {
    const ubicacion = await this.ubicacionRepository.findOneBy({
      idUbicacion: id,
    });
    return ubicacion ?? null;
  }

  create(data: Partial<UbicacionEventoEntity>): Promise<UbicacionEventoEntity> {
    return this.ubicacionRepository.save(this.ubicacionRepository.create(data));
  }

  async update(
    id: number,
    data: Partial<UbicacionEventoEntity>,
  ): Promise<UbicacionEventoEntity | null> {
    const ubicacion = await this.ubicacionRepository.findOneBy({
      idUbicacion: id,
    });
    if (!ubicacion) return null;

    Object.assign(ubicacion, data);
    return await this.ubicacionRepository.save(ubicacion);
  }

  async remove(id: number): Promise<UbicacionEventoEntity | null> {
    const ubicacion = await this.ubicacionRepository.findOneBy({
      idUbicacion: id,
    });
    if (!ubicacion) return null;

    await this.ubicacionRepository.remove(ubicacion);
    return ubicacion;
  }
}
