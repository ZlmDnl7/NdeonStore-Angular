import { createClient } from '@supabase/supabase-js';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Auth methods
  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getCurrentUser() {
    return await this.supabase.auth.getUser();
  }

  // Product methods
  async getProducts() {
    return await this.supabase
      .from('products')
      .select('*');
  }

  async createProduct(product: any) {
    return await this.supabase
      .from('products')
      .insert([product]);
  }

  async updateProduct(id: number, product: any) {
    return await this.supabase
      .from('products')
      .update(product)
      .eq('id', id);
  }

  async deleteProduct(id: number) {
    return await this.supabase
      .from('products')
      .delete()
      .eq('id', id);
  }

  // Storage methods
  async uploadProductImage(file: File, fileName: string) {
    return await this.supabase.storage
      .from('product-images')
      .upload(fileName, file);
  }

  async getProductImageUrl(path: string) {
    return await this.supabase.storage
      .from('product-images')
      .getPublicUrl(path);
  }

  async deleteProductImage(path: string) {
    return await this.supabase.storage
      .from('product-images')
      .remove([path]);
  }

  // User profile methods
  async createUserProfile(userId: string, profile: any) {
    return await this.supabase
      .from('profiles')
      .insert([{ ...profile, id: userId }]);
  }

  async getUserProfile(userId: string) {
    return await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
  }

  async updateUserProfile(userId: string, profile: any) {
    return await this.supabase
      .from('profiles')
      .update(profile)
      .eq('id', userId);
  }

  // Usuarios CRUD
  async getUsuarios() {
    return await this.supabase.from('usuarios').select('*');
  }

  async createUsuario(usuario: any) {
    return await this.supabase.from('usuarios').insert([usuario]);
  }

  async updateUsuario(id: number, usuario: any) {
    return await this.supabase.from('usuarios').update(usuario).eq('id', id);
  }

  async deleteUsuario(id: number) {
    return await this.supabase.from('usuarios').delete().eq('id', id);
  }

  // Categoria CRUD
  async getCategorias() {
    return await this.supabase
      .from('categorias')
      .select('*');
  }

  async createCategoria(categoria: any) {
    return await this.supabase
      .from('categorias')
      .insert([categoria]);
  }

  async updateCategoria(id: number, categoria: any) {
    return await this.supabase
      .from('categorias')
      .update(categoria)
      .eq('id', id);
  }

  async deleteCategoria(id: number) {
    return await this.supabase
      .from('categorias')
      .delete()
      .eq('id', id);
  }

  // Compras CRUD
  async getCompras() {
    return await this.supabase.from('compras').select('*');
  }

  async createCompra(compra: any) {
    return await this.supabase.from('compras').insert([compra]);
  }

  async updateCompra(id: number, compra: any) {
    return await this.supabase.from('compras').update(compra).eq('id', id);
  }

  async deleteCompra(id: number) {
    return await this.supabase.from('compras').delete().eq('id', id);
  }

  // Detalle Compras CRUD
  async getDetalleCompras() {
    return await this.supabase.from('detalle_compras').select('*');
  }

  async createDetalleCompra(detalle: any) {
    return await this.supabase.from('detalle_compras').insert([detalle]);
  }

  async updateDetalleCompra(id: number, detalle: any) {
    return await this.supabase.from('detalle_compras').update(detalle).eq('id', id);
  }

  async deleteDetalleCompra(id: number) {
    return await this.supabase.from('detalle_compras').delete().eq('id', id);
  }
} 