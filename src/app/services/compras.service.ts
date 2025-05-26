import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Compra } from '../core/models/compras.model';

@Injectable({ providedIn: 'root' })
export class ComprasService {
  constructor(private supabaseService: SupabaseService) {}

  async getCompras(): Promise<Compra[]> {
    const { data, error } = await this.supabaseService.getCompras();
    return error ? [] : data;
  }

  async addCompra(compra: Compra): Promise<number | null> {
    const { data, error } = await this.supabaseService.createCompra(compra);
    if (error || !data || !data[0]) return null;
    return (data[0] as Compra).id;
  }

  async updateCompra(id: number, compra: Compra): Promise<boolean> {
    const { error } = await this.supabaseService.updateCompra(id, compra);
    return !error;
  }

  async deleteCompra(id: number): Promise<boolean> {
    const { error } = await this.supabaseService.deleteCompra(id);
    return !error;
  }
} 