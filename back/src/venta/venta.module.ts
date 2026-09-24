import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from './entities/detalle-venta.entity';

// Importaciones ajustadas a nombres en singular:
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';

import { UsersModule } from '../users/users.module';
import { VENTAS_REPOSITORY } from './repositories/venta.repository';
import { TypeOrmVentasRepository } from './repositories/TypeOrmVentasRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, DetalleVenta]), UsersModule],
  controllers: [VentaController],
  providers: [
    VentaService,
    { provide: VENTAS_REPOSITORY, useClass: TypeOrmVentasRepository },
  ],
  exports: [VentaService, VENTAS_REPOSITORY],
})
export class VentasModule {}
