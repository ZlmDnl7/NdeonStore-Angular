import { Controller, Post, Body } from '@nestjs/common';
import { ComprasService } from './compras.service';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  async crearCompra(@Body() body: any) {
    const { usuario_id, total, detalles } = body;
    return await this.comprasService.crearCompra(usuario_id, total, detalles);
  }

  // Aquí irían los métodos CRUD protegidos
}
