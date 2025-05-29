import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ComprasService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');
    if (!url || !key) {
      throw new Error('SUPABASE_URL o SUPABASE_KEY no están definidas en el .env');
    }
    this.supabase = createClient(url, key);
  }

  async crearCompra(usuario_id: number, total: number, detalles: any[]) {
    if (!detalles || !Array.isArray(detalles)) {
      throw new Error('Detalles de la compra no enviados o no son un array');
    }
    // Insertar la compra
    const { data: compra, error: compraError } = await this.supabase
      .from('compras')
      .insert([{ usuario_id, total, fecha: new Date().toISOString() }])
      .select()
      .single();
    if (compraError) throw compraError;
    // Insertar los detalles
    const detallesInsert = detalles.map(d => ({
      compra_id: compra.id,
      producto_id: d.producto_id,
      cantidad: d.cantidad,
      precio_unitario: d.precio_unitario
    }));
    const { error: detallesError } = await this.supabase
      .from('detalle_compras')
      .insert(detallesInsert);
    if (detallesError) throw detallesError;
    return compra;
  }
}
