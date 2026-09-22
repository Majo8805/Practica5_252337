import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { MiembrosService } from './miembros.service.js';
import { CrearMiembroDto } from './dto/crear-miembro.dto.js';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto.js';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {}

  @Post()
  create(@Body() crearMiembroDto: CrearMiembroDto) {
    return this.miembrosService.create(crearMiembroDto);
  }

  @Get()
  findAll() {
    return this.miembrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.miembrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() actualizarMiembroDto: ActualizarMiembroDto) {
    return this.miembrosService.update(+id, actualizarMiembroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.miembrosService.remove(+id);
  }
}
