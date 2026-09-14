import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UbicacionEventoService } from './ubicacion-evento.service';
import { CreateUbicacionEventoDto } from './dto/create-ubicacion-evento.dto';
import { UpdateUbicacionEventoDto } from './dto/update-ubicacion-evento.dto';

@Controller('ubicacion-evento')
export class UbicacionEventoController {
  constructor(private readonly ubicacionEventoService: UbicacionEventoService) {}

  @Post()
  create(@Body() createUbicacionEventoDto: CreateUbicacionEventoDto) {
    return this.ubicacionEventoService.create(createUbicacionEventoDto);
  }

  @Get()
  findAll() {
    return this.ubicacionEventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubicacionEventoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUbicacionEventoDto: UpdateUbicacionEventoDto) {
    return this.ubicacionEventoService.update(+id, updateUbicacionEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubicacionEventoService.remove(+id);
  }
}
