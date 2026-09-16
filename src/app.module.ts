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
import { VentaModule } from './venta/venta.module';

@Module({
  imports: [
    // Configuración de variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuración de PostgreSQL con TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // Cambiar a false en producción
      }),
    }),

    // Módulos del dominio
    UsersModule,
    AuthModule,
    ProductoresModule,
    EventosModule,
    ReservacionesModule,
    PagosModule,
    TicketsModule,
    MetricasModule,
    VentaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}