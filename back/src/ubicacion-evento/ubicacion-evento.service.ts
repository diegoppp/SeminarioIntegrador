import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UbicacionEventoEntity } from './entities/ubicacion-evento.entity';
import { CreateUbicacionEventoDto } from './dto/create-ubicacion-evento.dto';
import { UpdateUbicacionEventoDto } from './dto/update-ubicacion-evento.dto';
import { UBICACION_EVENTO_REPOSITORY } from './repositories/ubicacion-evento.repository';
import type { UbicacionEventoRepository } from './repositories/ubicacion-evento.repository';

@Injectable()
export class UbicacionEventoService {
  constructor(
    @Inject(UBICACION_EVENTO_REPOSITORY)
    private readonly ubicacionEventoRepository: UbicacionEventoRepository,
  ) {}

  async create(
    createUbicacionEventoDto: CreateUbicacionEventoDto,
  ): Promise<UbicacionEventoEntity> {
    return await this.ubicacionEventoRepository.create(
      createUbicacionEventoDto,
    );
  }

  findAll(): Promise<UbicacionEventoEntity[]> {
    return this.ubicacionEventoRepository.findAll();
  }

  async findOne(id: number): Promise<UbicacionEventoEntity> {
    const ubicacion = await this.ubicacionEventoRepository.findOne(id);
    if (!ubicacion) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }
    return ubicacion;
  }

  async update(
    id: number,
    updateUbicacionEventoDto: UpdateUbicacionEventoDto,
  ): Promise<UbicacionEventoEntity> {
    const ubicacion = await this.ubicacionEventoRepository.update(
      id,
      updateUbicacionEventoDto,
    );
    if (!ubicacion) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }
    return ubicacion;
  }

  async remove(id: number): Promise<UbicacionEventoEntity> {
    const ubicacion = await this.ubicacionEventoRepository.remove(id);
    if (!ubicacion) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }
    return ubicacion;
  }
}
