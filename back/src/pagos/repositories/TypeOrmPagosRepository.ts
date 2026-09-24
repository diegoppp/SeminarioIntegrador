import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../../venta/entities/venta.entity';
import { Cobro } from '../entities/cobro.entity';
import type { PagosRepository } from './pagos.repository';

@Injectable()
export class TypeOrmPagosRepository implements PagosRepository {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Cobro)
    private readonly cobroRepository: Repository<Cobro>,
  ) {}

  createVenta(data: Partial<Venta>): Promise<Venta> {
    return this.ventaRepository.save(this.ventaRepository.create(data));
  }

  async findVentaById(id: string): Promise<Venta | null> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: { cobro: true },
    });
    return venta ?? null;
  }

  saveVenta(venta: Venta): Promise<Venta> {
    return this.ventaRepository.save(venta);
  }

  createCobro(data: Partial<Cobro>): Promise<Cobro> {
    return this.cobroRepository.save(this.cobroRepository.create(data));
  }
}
