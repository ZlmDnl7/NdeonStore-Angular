import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];

  constructor() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: Product): boolean {
    const nombreExiste = this.products.some(p => p.nombre.toLowerCase() === product.nombre.toLowerCase());
    const urlExiste = this.products.some(p => p.imagen === product.imagen);

    if (nombreExiste) {
      return false; // Nombre ya existe
    }
    if (urlExiste) {
      return false; // URL de imagen ya existe
    }

    this.products.push(product);
    this.saveProducts();
    return true;
  }

  deleteProduct(index: number): void {
    this.products.splice(index, 1);
    this.saveProducts();
  }

  private saveProducts(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
