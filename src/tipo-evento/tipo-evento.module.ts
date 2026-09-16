import { Module } from '@nestjs/common';
import { TipoEventoService } from './tipo-evento.service';
import { TipoEventoController } from './tipo-evento.controller';

@Module({
  controllers: [TipoEventoController],
  providers: [TipoEventoService],
})
export class TipoEventoModule {}
