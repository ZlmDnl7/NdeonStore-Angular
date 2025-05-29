import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async findAll() {
    return await this.productosService.findAll();
  }

  @Post()
  async create(@Body() createProductoDto: any) {
    return await this.productosService.create(createProductoDto);
  }
}
