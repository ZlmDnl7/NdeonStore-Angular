import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Product } from '../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private supabaseService: SupabaseService) {}

  async getProducts(): Promise<Product[]> {
    const { data, error } = await this.supabaseService.getProducts();
    return error ? [] : data;
  }

  async getProductById(id: number): Promise<Product | null> {
    const { data, error } = await this.supabaseService.getProducts();
    if (error) return null;
    return data.find((p: Product) => p.id === id) || null;
  }

  async addProduct(product: Product, imageFile?: File): Promise<boolean> {
    let imagen = product.imagen;
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error: imageError } = await this.supabaseService.uploadProductImage(imageFile, fileName);
      if (imageError) return false;
      const { data: { publicUrl } } = await this.supabaseService.getProductImageUrl(fileName);
      imagen = publicUrl;
    }
    const { error } = await this.supabaseService.createProduct({ ...product, imagen });
    return !error;
  }

  async updateProduct(id: number, product: Product, imageFile?: File): Promise<boolean> {
    let imagen = product.imagen;
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error: imageError } = await this.supabaseService.uploadProductImage(imageFile, fileName);
      if (imageError) return false;
      const { data: { publicUrl } } = await this.supabaseService.getProductImageUrl(fileName);
      imagen = publicUrl;
    }
    const { error } = await this.supabaseService.updateProduct(id, { ...product, imagen });
    return !error;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const { error } = await this.supabaseService.deleteProduct(id);
    return !error;
  }
} 