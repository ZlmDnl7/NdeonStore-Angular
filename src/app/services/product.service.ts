import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../core/models/product.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private api: ApiService) {}

  async getProducts(): Promise<Product[]> {
    try {
      return await firstValueFrom(this.api.get<Product[]>('/productos'));
    } catch {
      return [];
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      return await firstValueFrom(this.api.get<Product>(`/productos/${id}`));
    } catch {
      return null;
    }
  }

  async addProduct(product: Product): Promise<boolean> {
    try {
      await firstValueFrom(this.api.post('/productos', product));
      return true;
    } catch {
      return false;
    }
  }

  async updateProduct(id: number, product: Product): Promise<boolean> {
    try {
      await firstValueFrom(this.api.put(`/productos/${id}`, product));
      return true;
    } catch {
      return false;
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.api.delete(`/productos/${id}`));
      return true;
    } catch {
      return false;
    }
  }
} 