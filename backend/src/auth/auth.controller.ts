import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { usuario: string; contrasena: string; role?: string }) {
    return await this.authService.register(body.usuario, body.contrasena, body.role);
  }

  @Post('login')
  async login(@Body() body: { usuario: string; contrasena: string }) {
    return await this.authService.login(body.usuario, body.contrasena);
  }
} 