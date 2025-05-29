import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductosService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');
    if (!url || !key) {
      throw new Error('SUPABASE_URL o SUPABASE_KEY no están definidas en el .env');
    }
    this.supabase = createClient(url, key);
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('productos')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async create(createProductoDto: any) {
    const { data, error } = await this.supabase
      .from('productos')
      .insert([createProductoDto])
      .select();
    if (error) throw error;
    return data;
  }
}
