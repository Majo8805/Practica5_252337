import { Injectable } from '@nestjs/common';
export interface Clase{
    id: number;
    nombre: string;
}

const clases: Clase[] = [
    { id: 1, nombre: 'Yoga' },
    { id: 2, nombre: 'spinning' },
];

@Injectable()
export class ClasesService {
    listar(): Clase[] {
        return clases;
    }

    crear(clase: string): Clase {
        const nueva : Clase = { id: clases.length + 1, nombre: clase };
        clases.push(nueva);
        return nueva;
    }
}

