import { Miembro } from './entidades.js';
import { CrearMiembroDto } from '../dto/crear-miembro.dto.js';
import { ActualizarMiembroDto } from '../dto/actualizar-miembro.dto.js';

export interface MiembroRepository {
  listar(): Miembro[];
  buscarPorId(id: number): Miembro | undefined;
  crear(datos: CrearMiembroDto): Miembro;
  actualizar(id: number, datos: ActualizarMiembroDto): Miembro | undefined;
  eliminar(id: number): boolean;
}