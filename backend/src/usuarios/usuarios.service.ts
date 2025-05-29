import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');
    if (!url || !key) {
      throw new Error('SUPABASE_URL o SUPABASE_KEY no están definidas en el .env');
    }
    this.supabase = createClient(url, key);
  }

  async findAll(): Promise<any[]> {
    const { data, error } = await this.supabase.from('usuarios').select('id, usuario');
    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: number): Promise<any> {
    const { data, error } = await this.supabase.from('usuarios').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  }

  async create(usuario: any): Promise<any> {
    const { data, error } = await this.supabase.from('usuarios').insert([usuario]).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: number, usuario: any): Promise<any> {
    // If a new password is provided, hash it
    if (usuario.contrasena) {
      const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
      usuario.contrasena = hashedPassword;
    }
    const { data, error } = await this.supabase.from('usuarios').update(usuario).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: number): Promise<any> {
    const { data, error } = await this.supabase.from('usuarios').delete().eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
}