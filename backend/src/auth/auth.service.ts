import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');
    if (!url || !key) {
      throw new Error('SUPABASE_URL o SUPABASE_KEY no están definidas en el .env');
    }
    this.supabase = createClient(url, key);
  }

  async register(usuario: string, contrasena: string, role: string = 'user') {
    // Verificar si el usuario ya existe
    const { data: existing, error: findError } = await this.supabase.from('usuarios').select('*').eq('usuario', usuario).single();
    if (existing) {
      throw new ConflictException('El usuario ya existe');
    }
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    // Crear usuario
    const { data, error } = await this.supabase.from('usuarios').insert([{ usuario, contrasena: hashedPassword, role }]).select().single();
    if (error) throw new Error(error.message);
    return { id: data.id, usuario: data.usuario, role: data.role };
  }

  async login(usuario: string, contrasena: string) {
    // Buscar usuario
    const { data: user, error } = await this.supabase.from('usuarios').select('*').eq('usuario', usuario).single();
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordMatch) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    // Generar JWT
    const payload = { username: user.usuario, sub: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token, user: { id: user.id, usuario: user.usuario, role: user.role } };
  }
} 