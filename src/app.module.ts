import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductoresModule } from './productores/productores.module';
import { EventosModule } from './eventos/eventos.module';
import { ReservacionesModule } from './reservaciones/reservaciones.module';
import { PagosModule } from './pagos/pagos.module';
import { TicketsModule } from './tickets/tickets.module';
import { MetricasModule } from './metricas/metricas.module';
import { VentasModule } from './venta/venta.module';

@Module({
  imports: [
    // Configuración global de variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuración asíncrona de PostgreSQL mediante TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'eventos_db'),
        autoLoadEntities: true, // Carga automáticamente todas las entidades registradas en los módulos
        synchronize: true, // Crea/actualiza tablas automáticamente en desarrollo (desactivar en producción)
      }),
    }),

    // Módulos funcionales del sistema
    UsersModule,
    AuthModule,
    ProductoresModule,
    EventosModule,
    ReservacionesModule,
    PagosModule,
    TicketsModule,
    MetricasModule,
    VentasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}