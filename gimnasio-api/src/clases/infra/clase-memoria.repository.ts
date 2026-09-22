import { Injectable } from "@nestjs/common";
import { ClaseRepository } from "../dominio/clase.repository.js";
import { Clase } from "../clases.service.js";
import { CrearClaseDto } from "../dto/crear-clase.dto.js";
import { ActualizarClaseDto } from "../dto/editar-clase.dto.js";

@Injectable()
export class ClaseMemoriaRepository implements ClaseRepository {
    listar(): Promise<Clase[]> {
        return Promise.resolve([...this.clases]);
    }
    private clases: Clase[] = [
        { id: 1, nombre: 'Yoga' },
        { id: 2, nombre: 'spinning' },
    ];

    private siguienteId: number = 3;

    async buscarPorId(id: number): Promise<Clase | null> {
        return this.clases.find(c => c.id === id) ?? null;
    }

    async crear(datos: CrearClaseDto): Promise<Clase> {
        const nueva: Clase = { id: this.siguienteId++, nombre: datos.nombre };
        this.clases.push(nueva);
        return (nueva);
    }

    async actualizar(id: number, datos: ActualizarClaseDto): Promise<Clase | null> {
        const clase = this.clases.find(c => c.id === id);
        if (!clase) {
            return null;
        }

        if (datos.nombre !== undefined) {
            clase.nombre = datos.nombre;
        }

        return clase;
    }

    async eliminar(id: number): Promise<Clase | null> {
        const indice = this.clases.findIndex(c => c.id === id);
        if (indice === -1) {
            return null;
        }
        const [eliminado] = this.clases.splice(indice, 1);
        return eliminado;
    }
}
