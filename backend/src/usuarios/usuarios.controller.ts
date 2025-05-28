import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async findAll() {
    return await this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usuariosService.findOne(Number(id));
  }

  @Post()
  async create(@Body() usuario: any) {
    return await this.usuariosService.create(usuario);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() usuario: any) {
    return await this.usuariosService.update(Number(id), usuario);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.usuariosService.remove(Number(id));
  }
}