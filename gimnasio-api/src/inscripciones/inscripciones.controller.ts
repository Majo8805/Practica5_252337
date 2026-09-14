import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service.js';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto.js';
import type { CrearInscripcionDto } from './dto/crear-inscripcion.dto.js';
import type { Response } from 'express';

@Controller('inscripciones')
export class InscripcionesController {
    constructor(
        private readonly servicio: InscripcionesService
    ) { }

    @Post()
    async listar() {
        const lista = await this.servicio.listar();
        return lista.map(aInscripcionDto);
    }

    @Get(':id')
    async buscar(@Param('id') id: string) {
        const inscripcion = await this.servicio.buscar(Number(id));
        if (!inscripcion) {
            throw new NotFoundException("No existe la inscripción");
        }
        return aInscripcionDto(inscripcion);
    }

    @Post()
    async crear(
        @Body() dto: CrearInscripcionDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        if (!dto.horarioId || !dto.miembroId) {
            throw new NotFoundException('horarioId y miembroId son obligatorios');
        }

        try {
            const inscripcion = await this.servicio.crear(dto);
            res.setHeader('Location', `/inscripciones/${inscripcion.id}`);
            return aInscripcionDto(inscripcion);

        } catch (error) {
            throw new NotFoundException((error as Error).message);
        }
    }

    @Delete(':id')
    async cancelar(@Param('id') id: string) {
        const cancelada = await this.servicio.cancelar(Number(id));
        if (!cancelada) {
            throw new NotFoundException(`No existe la inscripcion ${id}`);
        }
        return aInscripcionDto(cancelada);
    }
}

