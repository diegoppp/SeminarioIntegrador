import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cobro } from './entities/cobro.entity';
import { MedioDePago } from './entities/medio-de-pago.entity';

import { Venta } from '../venta/entities/venta.entity';
import { DetalleVenta } from '../venta/entities/detalle-venta.entity';

import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cobro, MedioDePago, Venta, DetalleVenta]),
    UsersModule,
  ],
  controllers: [PagosController],
  providers: [PagosService],
  exports: [PagosService, TypeOrmModule],
})
export class PagosModule {}