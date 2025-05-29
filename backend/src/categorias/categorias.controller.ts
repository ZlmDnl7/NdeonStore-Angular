import { Controller, Get } from '@nestjs/common';
import { CategoriasService } from './categorias.service';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  async findAll() {
    return await this.categoriasService.findAll();
  }

  // Aquí irían los métodos CRUD protegidos
}
