import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionEventoService } from './ubicacion-evento.service';
import { UbicacionEventoController } from './ubicacion-evento.controller';
import { UbicacionEventoEntity } from './entities/ubicacion-evento.entity';
import { UBICACION_EVENTO_REPOSITORY } from './repositories/ubicacion-evento.repository';
import { TypeOrmUbicacionEventoRepository } from './repositories/TypeOrmUbicacionEventoRepository';

@Module({
  imports: [TypeOrmModule.forFeature([UbicacionEventoEntity])],
  controllers: [UbicacionEventoController],
  providers: [
    UbicacionEventoService,
    {
      provide: UBICACION_EVENTO_REPOSITORY,
      useClass: TypeOrmUbicacionEventoRepository,
    },
  ],
  exports: [UbicacionEventoService, UBICACION_EVENTO_REPOSITORY],
})
export class UbicacionEventoModule {}
