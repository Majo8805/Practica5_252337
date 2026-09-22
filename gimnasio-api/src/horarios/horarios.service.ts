import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { HORARIO_REPOSITORY } from './horarios.tokens.js';
import type { HorarioRepository } from './dominio/horario.repository.js';
import { CrearHorarioDto } from './dto/crear-horario.dto.js';
import { ActualizarHorarioDto } from './dto/actualizar-horario.dto.js';

@Injectable()
export class HorariosService {
  constructor(
    @Inject(HORARIO_REPOSITORY)
    private readonly horarioRepository: HorarioRepository,
  ) {}

  listar() {
    return this.horarioRepository.listar();
  }

  buscar(id: number) {
    const horario = this.horarioRepository.buscarPorId(id);
    if (!horario) throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    return horario;
  }

  crear(datos: CrearHorarioDto) {
    return this.horarioRepository.crear(datos);
  }

  actualizar(id: number, datos: ActualizarHorarioDto) {
    const horario = this.horarioRepository.actualizar(id, datos);
    if (!horario) throw new NotFoundException(`Horario con ID ${id} no encontrado para actualizar`);
    return horario;
  }

  eliminar(id: number) {
    const eliminado = this.horarioRepository.eliminar(id);
    if (!eliminado) throw new NotFoundException(`Horario con ID ${id} no encontrado para eliminar`);
    return { mensaje: 'Horario eliminado con éxito' };
  }
}