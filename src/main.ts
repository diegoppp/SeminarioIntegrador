import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita la validación global de los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve campos extras no definidos en el DTO
      forbidNonWhitelisted: true, // Lanza error si se envían campos no permitidos
      transform: true, // Convierte tipos automáticamente de acuerdo al DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();