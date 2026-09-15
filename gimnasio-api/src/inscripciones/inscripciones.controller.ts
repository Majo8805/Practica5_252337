import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service.js';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto.js';
import type { CrearInscripcionDto } from './dto/crear-inscripcion.dto.js';
import type { Response } from 'express';
import { CupoLlenoError, HorarioNoEncontradoError, InscripcionDuplicadaError, MiembroNoEncontradoError } from './dominio/errores.js';

@Controller('inscripciones')
export class InscripcionesController {
    constructor(
        private readonly servicio: InscripcionesService
    ) { }

    @Get()
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
    @HttpCode(201)
    async crear(
        @Body() dto: CrearInscripcionDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        if (!dto.horarioId || !dto.miembroId) {
            throw new BadRequestException('horarioId y miembroId son obligatorios');
        }

        try {
            const inscripcion = await this.servicio.crear(dto);

            res.setHeader('Location', `/inscripciones/${inscripcion.id}`);
            return aInscripcionDto(inscripcion);

        } catch (error) {
            const err = error as Error;

            if (err instanceof HorarioNoEncontradoError || err instanceof MiembroNoEncontradoError) {
                throw new NotFoundException(err.message);
            }

            if (err instanceof CupoLlenoError || err instanceof InscripcionDuplicadaError) {
                throw new ConflictException(err.message);
            }

            throw err;
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

