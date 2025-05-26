import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { DetalleCompra } from '../core/models/detalle_compras.model';

@Injectable({ providedIn: 'root' })
export class DetalleComprasService {
  constructor(private supabaseService: SupabaseService) {}

  async getDetalleCompras(): Promise<DetalleCompra[]> {
    const { data, error } = await this.supabaseService.getDetalleCompras();
    return error ? [] : data;
  }

  async addDetalleCompra(detalle: DetalleCompra): Promise<boolean> {
    const { error } = await this.supabaseService.createDetalleCompra(detalle);
    return !error;
  }

  async updateDetalleCompra(id: number, detalle: DetalleCompra): Promise<boolean> {
    const { error } = await this.supabaseService.updateDetalleCompra(id, detalle);
    return !error;
  }

  async deleteDetalleCompra(id: number): Promise<boolean> {
    const { error } = await this.supabaseService.deleteDetalleCompra(id);
    return !error;
  }
} 