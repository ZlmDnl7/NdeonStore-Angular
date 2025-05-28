import { Module } from '@nestjs/common';
import { DetalleComprasService } from './detalle-compras.service';
import { DetalleComprasController } from './detalle-compras.controller';

@Module({
  controllers: [DetalleComprasController],
  providers: [DetalleComprasService],
  exports: [DetalleComprasService],
})
export class DetalleComprasModule {} 