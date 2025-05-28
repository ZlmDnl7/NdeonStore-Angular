import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Compra } from '../core/models/compras.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComprasService {
  constructor(private api: ApiService) {}

  async getCompras(): Promise<Compra[]> {
    try {
      return await firstValueFrom(this.api.get<Compra[]>('/compras'));
    } catch {
      return [];
    }
  }

  async addCompra(compra: Compra): Promise<number | null> {
    try {
      const res: any = await firstValueFrom(this.api.post('/compras', compra));
      return res && res.id ? res.id : null;
    } catch {
      return null;
    }
  }

  async updateCompra(id: number, compra: Compra): Promise<boolean> {
    try {
      await firstValueFrom(this.api.put(`/compras/${id}`, compra));
      return true;
    } catch {
      return false;
    }
  }

  async deleteCompra(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.api.delete(`/compras/${id}`));
      return true;
    } catch {
      return false;
    }
  }
} 