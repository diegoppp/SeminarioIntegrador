import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { EventoEntity } from './entities/evento.entity';
import { EVENTOS_REPOSITORY } from './repositories/eventos.repository';
import { TypeOrmEventosRepository } from './repositories/TypeOrmEventosRepository';
import { TipoEventoEntity } from 'src/tipo-evento/entities/tipo-evento.entity';

@Module({
  controllers: [EventosController],
  imports: [TypeOrmModule.forFeature([EventoEntity, TipoEventoEntity])],
  providers: [EventosService, { provide: EVENTOS_REPOSITORY, useClass: TypeOrmEventosRepository }],
  exports: [EventosService, EVENTOS_REPOSITORY],
})
export class EventosModule {}
