import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Categoria } from '../core/models/categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  constructor(private supabaseService: SupabaseService) {}

  async getCategorias(): Promise<Categoria[]> {
    const { data, error } = await this.supabaseService.getCategorias();
    return error ? [] : data;
  }

  async addCategoria(categoria: Categoria): Promise<boolean> {
    const { error } = await this.supabaseService.createCategoria(categoria);
    return !error;
  }

  async updateCategoria(id: number, categoria: Categoria): Promise<boolean> {
    const { error } = await this.supabaseService.updateCategoria(id, categoria);
    return !error;
  }

  async deleteCategoria(id: number): Promise<boolean> {
    const { error } = await this.supabaseService.deleteCategoria(id);
    return !error;
  }
} 