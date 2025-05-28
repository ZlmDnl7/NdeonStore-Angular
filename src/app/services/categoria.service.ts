import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Categoria } from '../core/models/categoria.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  constructor(private api: ApiService) {}

  async getCategorias(): Promise<Categoria[]> {
    try {
      return await firstValueFrom(this.api.get<Categoria[]>('/categorias'));
    } catch {
      return [];
    }
  }

  async addCategoria(categoria: Categoria): Promise<boolean> {
    try {
      await firstValueFrom(this.api.post('/categorias', categoria));
      return true;
    } catch {
      return false;
    }
  }

  async updateCategoria(id: number, categoria: Categoria): Promise<boolean> {
    try {
      await firstValueFrom(this.api.put(`/categorias/${id}`, categoria));
      return true;
    } catch {
      return false;
    }
  }

  async deleteCategoria(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.api.delete(`/categorias/${id}`));
      return true;
    } catch {
      return false;
    }
  }
} 