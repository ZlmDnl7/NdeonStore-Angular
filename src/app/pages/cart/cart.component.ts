import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../core/models/cart-item.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  decreaseQuantity(index: number): void {
    const item = this.cartItems[index];
    this.cartService.updateQuantity(index, item.quantity - 1);
    this.loadCart();
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    this.loadCart();
  }

  checkout(): void {
    alert('Compra realizada con éxito. ¡Gracias!');
    this.cartService.clearCart();
    this.router.navigate(['/product']);
  }
}
