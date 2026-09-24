import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { UsersService } from '../users/users.service';
import { VENTAS_REPOSITORY } from './repositories/venta.repository';
import type { VentasRepository } from './repositories/venta.repository';

@Injectable()
export class VentaService {
  constructor(
    @Inject(VENTAS_REPOSITORY)
    private readonly ventasRepository: VentasRepository,
    private readonly usersService: UsersService,
  ) {}

  // Genera un string con la fecha y hora exacta + 4 dígitos randoms
  private generarNumeroVenta(): string {
    return `VEN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    // Verifica que el usuario exista
    const usuario = await this.usersService.findOne(createVentaDto.usuarioId);

    let total = 0;
    const detalles = createVentaDto.detalles.map((d) => {
      const subtotal = d.cantidad * d.precioUnitario;
      total += subtotal;

      const detalle = new DetalleVenta();
      detalle.cantidad = d.cantidad;
      detalle.precioUnitario = d.precioUnitario;
      detalle.subtotal = subtotal;
      return detalle;
    });

    return await this.ventasRepository.create({
      numeroVenta: this.generarNumeroVenta(),
      usuario,
      total,
      detalleVenta: detalles,
    });
  }

  findAll(): Promise<Venta[]> {
    return this.ventasRepository.findAll();
  }

  async findOne(id: string): Promise<Venta> {
    const venta = await this.ventasRepository.findOne(id);
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return venta;
  }

  async update(id: string, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.ventasRepository.findOne(id);
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }

    const data: Partial<Venta> = {};
    if (updateVentaDto.usuarioId) {
      data.usuario = await this.usersService.findOne(updateVentaDto.usuarioId);
    }
    if (updateVentaDto.detalles) {
      const detalles = updateVentaDto.detalles.map((d) => {
        const subtotal = d.cantidad * d.precioUnitario;

        const detalle = new DetalleVenta();
        detalle.cantidad = d.cantidad;
        detalle.precioUnitario = d.precioUnitario;
        detalle.subtotal = subtotal;
        return detalle;
      });
      data.detalleVenta = detalles;
      data.total = detalles.reduce((sum, d) => sum + d.subtotal, 0);
    }

    const updated = await this.ventasRepository.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return updated;
  }

  async remove(id: string): Promise<Venta> {
    const venta = await this.ventasRepository.remove(id);
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return venta;
  }
}
