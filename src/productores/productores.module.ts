import { Module } from '@nestjs/common';
import { ProductoresService } from './productores.service';
import { ProductoresController } from './productores.controller';

@Module({
  controllers: [ProductoresController],
  providers: [ProductoresService],
})
export class ProductoresModule {}
