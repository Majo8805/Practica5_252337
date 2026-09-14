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

  
}