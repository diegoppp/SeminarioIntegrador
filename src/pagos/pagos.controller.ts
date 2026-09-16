import { Controller, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreateVentaDto } from '../venta/dto/create-venta.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post('venta')
  crearVenta(@Body() createVentaDto: CreateVentaDto) {
    return this.pagosService.crearVenta(createVentaDto);
  }

  @Post('confirmar/:ventaId')
  confirmarCobro(
    @Param('ventaId', ParseUUIDPipe) ventaId: string,
    @Body('idTransaccion') idTransaccion: string,
  ) {
    return this.pagosService.confirmarCobro(ventaId, idTransaccion);
  }
}