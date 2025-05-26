import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  constructor() {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Product, cantidad: number): void {
    const item = this.cart.find(i => i.product.id === product.id);
    if (item) {
      item.cantidad += cantidad;
    } else {
      this.cart.push({ product, cantidad });
    }
    this.saveCart();
  }

  updateQuantity(index: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.cart.splice(index, 1);
    } else {
      this.cart[index].cantidad = cantidad;
    }
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + (item.product.precio * item.cantidad), 0);
  }

  private saveCart(): void {
    localStorage.setItem('carrito', JSON.stringify(this.cart));
  }
}
