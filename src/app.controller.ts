/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //decorator como está vazio () vai receber pelo 
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // rota get. Criando uma rota no recurso /
  getHello(): string {
    return this.appService.getHello();
  }
}