import { Horario } from './entidades.js';
import { CrearHorarioDto } from '../dto/crear-horario.dto.js';
import { ActualizarHorarioDto } from '../dto/actualizar-horario.dto.js';2

export interface HorarioRepository {
  listar(): Horario[];
  buscarPorId(id: number): Horario | undefined;
  crear(datos: CrearHorarioDto): Horario;
  actualizar(id: number, datos: ActualizarHorarioDto): Horario | undefined;
  eliminar(id: number): boolean;
}