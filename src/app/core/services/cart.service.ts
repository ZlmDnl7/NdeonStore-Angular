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

  addToCart(product: Product, quantity: number): void {
    const item = this.cart.find(i => i.product.nombre === product.nombre);
    if (item) {
      item.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    this.saveCart();
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity <= 0) {
      this.cart.splice(index, 1);
    } else {
      this.cart[index].quantity = quantity;
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
    return this.cart.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
  }

  private saveCart(): void {
    localStorage.setItem('carrito', JSON.stringify(this.cart));
  }
}
