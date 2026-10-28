import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { EventoEntity } from './entities/evento.entity';
import { EVENTOS_REPOSITORY } from './repositories/eventos.repository';
import { TypeOrmEventosRepository } from './repositories/TypeOrmEventosRepository';
import { TipoEventoEntity } from '../tipo-evento/tipo-evento.entity';
import { UbicacionEventoEntity } from '../ubicacion-evento/entities/ubicacion-evento.entity';

// Entidades de relaciones
import { EntryEntity } from '../entradas/entities/entry.entity';
import { EntryFeeEntity } from '../tarifas-entrada/entities/entry-fee.entity';
import { CambioEstadoEventoEntity } from './entities/cambio-estado-evento.entity';
import { SectorEntity } from '../sectores/entities/sector.entity';
import { CambioEstadoEntradaEntity } from '../entradas/entities/cambio-estado-entrada.entity'; 

@Module({
  controllers: [EventosController],
  imports: [
    TypeOrmModule.forFeature([
      EventoEntity,
      TipoEventoEntity,
      UbicacionEventoEntity,
      EntryEntity,
      EntryFeeEntity,
      CambioEstadoEventoEntity,
      SectorEntity,
      CambioEstadoEntradaEntity, 
    ]),
  ],
  providers: [
    EventosService,
    { provide: EVENTOS_REPOSITORY, useClass: TypeOrmEventosRepository },
  ],
  exports: [EventosService, EVENTOS_REPOSITORY],
})
export class EventosModule {}