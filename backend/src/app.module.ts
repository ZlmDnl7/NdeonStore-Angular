import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ComprasModule } from './compras/compras.module';
import { DetalleComprasModule } from './detalle-compras/detalle-compras.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsuariosModule,
    ProductosModule,
    CategoriasModule,
    ComprasModule,
    DetalleComprasModule,
  ],
})
export class AppModule {}