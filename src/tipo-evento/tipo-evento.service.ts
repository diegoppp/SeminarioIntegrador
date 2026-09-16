import { Injectable } from '@nestjs/common';
import { CreateTipoEventoDto } from './dto/create-tipo-evento.dto';
import { UpdateTipoEventoDto } from './dto/update-tipo-evento.dto';

@Injectable()
export class TipoEventoService {
  create(createTipoEventoDto: CreateTipoEventoDto) {
    return 'This action adds a new tipoEvento';
  }

  findAll() {
    return `This action returns all tipoEvento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoEvento`;
  }

  update(id: number, updateTipoEventoDto: UpdateTipoEventoDto) {
    return `This action updates a #${id} tipoEvento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoEvento`;
  }
}
