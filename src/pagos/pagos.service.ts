import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importaciones actualizadas con la ruta hacia el módulo de ventas
import { Venta } from '../venta/entities/venta.entity';
import { DetalleVenta } from '../venta/entities/detalle-venta.entity';
import { CreateVentaDto } from '../venta/dto/create-venta.dto';

// Importaciones locales del módulo de pagos
import { Cobro, EstadoCobro } from './entities/cobro.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Cobro)
    private readonly cobroRepository: Repository<Cobro>,
    private readonly usersService: UsersService,
  ) {}

  // Genera un string con la fecha y hora exacta + 4 dígitos randoms
  private generarNumeroVenta(): string {
    return `VEN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  async crearVenta(createVentaDto: CreateVentaDto): Promise<Venta> {
    // Verifica que el usuario exista
    const usuario = await this.usersService.findOne(createVentaDto.usuarioId);

    let total = 0;
    const detalles: DetalleVenta[] = createVentaDto.detalles.map((d) => {
      const subtotal = d.cantidad * d.precioUnitario;
      total += subtotal;

      const detalle = new DetalleVenta();
      detalle.cantidad = d.cantidad;
      detalle.precioUnitario = d.precioUnitario;
      detalle.subtotal = subtotal;
      return detalle;
    });

    const nuevaVenta = this.ventaRepository.create({
      numeroVenta: this.generarNumeroVenta(),
      usuario,
      total,
      detalleVenta: detalles,
    });

    return await this.ventaRepository.save(nuevaVenta);
  }

  async confirmarCobro(ventaId: string, idTransaccion: string): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({
    where: { id: ventaId },
    relations: {
      cobro: true,
    },
    });

    if (!venta) {
      throw new NotFoundException(`Venta ${ventaId} no encontrada`);
    }

    const cobro = this.cobroRepository.create({
      monto: venta.total,
      estadoCobro: EstadoCobro.APROBADO,
      idTransaccion,
    });

    venta.cobro = await this.cobroRepository.save(cobro);
    return await this.ventaRepository.save(venta);
  }
}