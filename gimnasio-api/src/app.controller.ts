import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private clases = [
    { id: 1, nombre: 'Yoga' },
    { id: 2, nombre: 'Pilates' }
  ];

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('clases')
  obtenerClases() {
    return this.clases;
  }

  @Post('clases')
  crearClase(@Body() nuevaClase: any) {
    const id = this.clases.length > 0 ? this.clases[this.clases.length - 1].id + 1 : 1;
    const claseConId = { id, ...nuevaClase };
    this.clases.push(claseConId);
    return claseConId;
  }
}