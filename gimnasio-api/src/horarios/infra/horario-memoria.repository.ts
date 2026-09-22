import { HorarioRepository } from '../dominio/horario.repository.js';
import { Horario } from '../dominio/entidades.js';
import { CrearHorarioDto } from '../dto/crear-horario.dto.js';
import { ActualizarHorarioDto } from '../dto/actualizar-horario.dto.js';

export class HorarioMemoriaRepository implements HorarioRepository {
  private horarios: Horario[] = [
    { id: 1, claseId: 101, dia: 'Lunes', horaInicio: '08:00', cupoMaximo: 20, entrenador: 'Carlos' },
    { id: 2, claseId: 102, dia: 'Martes', horaInicio: '10:00', cupoMaximo: 15, entrenador: 'Ana' },
    { id: 3, claseId: 103, dia: 'Miércoles', horaInicio: '18:00', cupoMaximo: 20, entrenador: 'Carlos' }
  ];
  private siguienteId = 4;

  listar(): Horario[] {
    return this.horarios;
  }

  buscarPorId(id: number): Horario | undefined {
    return this.horarios.find((h) => h.id === id);
  }

  crear(datos: CrearHorarioDto): Horario {
    const nuevoHorario: Horario = {
      id: this.siguienteId++,
      ...datos,
    };
    this.horarios.push(nuevoHorario);
    return nuevoHorario;
  }

  actualizar(id: number, datos: ActualizarHorarioDto): Horario | undefined {
    const index = this.horarios.findIndex((h) => h.id === id);
    if (index === -1) return undefined;

    this.horarios[index] = { ...this.horarios[index], ...datos };
    return this.horarios[index];
  }

  eliminar(id: number): boolean {
    const index = this.horarios.findIndex((h) => h.id === id);
    if (index === -1) return false;

    this.horarios.splice(index, 1);
    return true;
  }
}