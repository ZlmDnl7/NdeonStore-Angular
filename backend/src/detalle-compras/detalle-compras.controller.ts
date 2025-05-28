import { Controller, UseGuards } from '@nestjs/common';
import { DetalleComprasService } from './detalle-compras.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('detalle-compras')
export class DetalleComprasController {
  constructor(private readonly detalleComprasService: DetalleComprasService) {}

  // Aquí irían los métodos CRUD protegidos
}
