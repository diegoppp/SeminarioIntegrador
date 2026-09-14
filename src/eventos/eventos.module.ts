import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { EventoEntity } from './entities/evento.entity';

@Module({
  controllers: [EventosController],
  imports: [TypeOrmModule.forFeature([EventoEntity])],
  providers: [EventosService, { provide: EVENTOS_REPOSITORY, useClass: TypeOrmProductsRepository }],
  exports: [EventosService, EVENTOS_REPOSITORY]
})
export class EventosModule {}
