import { Injectable } from '@nestjs/common';
import { CreateUbicacionEventoDto } from './dto/create-ubicacion-evento.dto';
import { UpdateUbicacionEventoDto } from './dto/update-ubicacion-evento.dto';

@Injectable()
export class UbicacionEventoService {
  create(createUbicacionEventoDto: CreateUbicacionEventoDto) {
    return 'This action adds a new ubicacionEvento';
  }

  findAll() {
    return `This action returns all ubicacionEvento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ubicacionEvento`;
  }

  update(id: number, updateUbicacionEventoDto: UpdateUbicacionEventoDto) {
    return `This action updates a #${id} ubicacionEvento`;
  }

  remove(id: number) {
    return `This action removes a #${id} ubicacionEvento`;
  }
}
