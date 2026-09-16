import { Injectable } from '@nestjs/common';
import { CreateMetricaDto } from './dto/create-metrica.dto';
import { UpdateMetricaDto } from './dto/update-metrica.dto';

@Injectable()
export class MetricasService {
  create(createMetricaDto: CreateMetricaDto) {
    return 'This action adds a new metrica';
  }

  findAll() {
    return `This action returns all metricas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metrica`;
  }

  update(id: number, updateMetricaDto: UpdateMetricaDto) {
    return `This action updates a #${id} metrica`;
  }

  remove(id: number) {
    return `This action removes a #${id} metrica`;
  }
}
