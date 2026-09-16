import { Module } from '@nestjs/common';
import { UbicacionEventoService } from './ubicacion-evento.service';
import { UbicacionEventoController } from './ubicacion-evento.controller';

@Module({
  controllers: [UbicacionEventoController],
  providers: [UbicacionEventoService],
})
export class UbicacionEventoModule {}
