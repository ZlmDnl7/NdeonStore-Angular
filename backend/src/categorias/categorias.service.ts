import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoriasService {
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
      .from('categorias')
      .select('*');
    if (error) throw error;
    return data;
  }
}
