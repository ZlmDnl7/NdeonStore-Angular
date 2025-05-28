import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DetalleCompra } from '../core/models/detalle_compras.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DetalleComprasService {
  constructor(private api: ApiService) {}

  async getDetalleCompras(): Promise<DetalleCompra[]> {
    try {
      return await firstValueFrom(this.api.get<DetalleCompra[]>('/detalle-compras'));
    } catch {
      return [];
    }
  }

  async addDetalleCompra(detalle: DetalleCompra): Promise<boolean> {
    try {
      await firstValueFrom(this.api.post('/detalle-compras', detalle));
      return true;
    } catch {
      return false;
    }
  }

  async updateDetalleCompra(id: number, detalle: DetalleCompra): Promise<boolean> {
    try {
      await firstValueFrom(this.api.put(`/detalle-compras/${id}`, detalle));
      return true;
    } catch {
      return false;
    }
  }

  async deleteDetalleCompra(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.api.delete(`/detalle-compras/${id}`));
      return true;
    } catch {
      return false;
    }
  }
} 