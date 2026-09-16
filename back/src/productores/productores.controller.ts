import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductoresService } from './productores.service';
import { CreateProductoreDto } from './dto/create-productore.dto';
import { UpdateProductoreDto } from './dto/update-productore.dto';

@Controller('productores')
export class ProductoresController {
  constructor(private readonly productoresService: ProductoresService) {}

  @Post()
  create(@Body() createProductoreDto: CreateProductoreDto) {
    return this.productoresService.create(createProductoreDto);
  }

  @Get()
  findAll() {
    return this.productoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoreDto: UpdateProductoreDto) {
    return this.productoresService.update(+id, updateProductoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoresService.remove(+id);
  }
}
