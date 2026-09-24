import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from '../entities/venta.entity';
import type { VentasRepository } from './venta.repository';

@Injectable()
export class TypeOrmVentasRepository implements VentasRepository {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
  ) {}

  findAll(): Promise<Venta[]> {
    return this.ventaRepository.find({ relations: { detalleVenta: true } });
  }

  async findOne(id: string): Promise<Venta | null> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: { detalleVenta: true },
    });
    return venta ?? null;
  }

  create(data: Partial<Venta>): Promise<Venta> {
    return this.ventaRepository.save(this.ventaRepository.create(data));
  }

  async update(id: string, data: Partial<Venta>): Promise<Venta | null> {
    const venta = await this.ventaRepository.findOneBy({ id });
    if (!venta) return null;

    Object.assign(venta, data);
    return await this.ventaRepository.save(venta);
  }

  async remove(id: string): Promise<Venta | null> {
    const venta = await this.ventaRepository.findOneBy({ id });
    if (!venta) return null;

    await this.ventaRepository.remove(venta);
    return venta;
  }
}
