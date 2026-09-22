import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';
import type { MiembroRepository } from './dominio/miembro.repository.js';
import { CrearMiembroDto } from './dto/crear-miembro.dto.js';
import { ActualizarMiembroDto } from './dto/actualizar-miembro.dto.js';

@Injectable()
export class MiembrosService {
  constructor(
    @Inject(MIEMBRO_REPOSITORY)
    private readonly miembroRepository: MiembroRepository,
  ) { }

  create(crearMiembroDto: CrearMiembroDto) {
    return this.miembroRepository.crear(crearMiembroDto);
  }

  findAll() {
    return this.miembroRepository.listar();
  }

  findOne(id: number) {
    const miembro = this.miembroRepository.buscarPorId(id);
    if (!miembro) throw new NotFoundException(`Miembro con el ID ${id} no encontrado`);
    return miembro;
  }

  update(id: number, actualizarMiembroDto: ActualizarMiembroDto) {
    const miembro = this.miembroRepository.actualizar(id, actualizarMiembroDto);
    if (!miembro) throw new NotFoundException(`Miembro con el ID ${id} no encontrado para actualizar`);
    return miembro;
  }

  remove(id: number) {
    const eliminado = this.miembroRepository.eliminar(id);
    if (!eliminado) throw new NotFoundException(`Miembro con ID ${id} no encontrado para eliminar`);
    return { mensaje: 'Miembro eliminado con éxito' };
  }
}
