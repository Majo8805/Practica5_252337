import { MiembroRepository } from '../dominio/miembro.repository.js';
import { Miembro } from '../dominio/entidades.js';
import { CrearMiembroDto } from '../dto/crear-miembro.dto.js';
import { ActualizarMiembroDto } from '../dto/actualizar-miembro.dto.js';

export class MiembroMemoriaRepository implements MiembroRepository {
  private miembros: Miembro[] = [
    { id: 1, nombre: 'Juan Perez', correo: 'juan@test.com', membresia: 'Básica', activo: true },
    { id: 2, nombre: 'Maria Gomez', correo: 'maria@test.com', membresia: 'Premium', activo: true },
    { id: 3, nombre: 'Carlos Ruiz', correo: 'carlos@test.com', membresia: 'VIP', activo: false },
  ];
  private siguienteId = 4;

  listar(): Miembro[] {
    return this.miembros;
  }

  buscarPorId(id: number): Miembro | undefined {
    return this.miembros.find((m) => m.id === id);
  }

  crear(datos: CrearMiembroDto): Miembro {
    const nuevoMiembro: Miembro = {
      id: this.siguienteId++,
      ...datos,
      activo: true, // Por defecto al crear es activo
    };
    this.miembros.push(nuevoMiembro);
    return nuevoMiembro;
  }

  actualizar(id: number, datos: ActualizarMiembroDto): Miembro | undefined {
    const index = this.miembros.findIndex((m) => m.id === id);
    if (index === -1) return undefined;

    this.miembros[index] = { ...this.miembros[index], ...datos };
    return this.miembros[index];
  }

  eliminar(id: number): boolean {
    const index = this.miembros.findIndex((m) => m.id === id);
    if (index === -1) return false;

    this.miembros.splice(index, 1);
    return true;
  }
}