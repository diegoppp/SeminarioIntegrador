import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MetricasModule } from './metricas/metricas.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ProductoresModule } from './productores/productores.module';
import { EventosModule } from './eventos/eventos.module';
import { ReservacionesModule } from './reservaciones/reservaciones.module';
import { PagosModule } from './pagos/pagos.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule, ProductoresModule, EventosModule, ReservacionesModule, PagosModule, TicketsModule, MetricasModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, AuthService],
})
export class AppModule {}
