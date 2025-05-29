import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../core/models/cart-item.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ComprasService } from '../../services/compras.service';
import { DetalleComprasService } from '../../services/detalle-compras.service';
import { AuthService } from '../../services/auth.service';
import { Compra } from '../../core/models/compras.model';
import { DetalleCompra } from '../../core/models/detalle_compras.model';
import { ModalService } from '../../services/modal.service';

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

  constructor(
    private cartService: CartService,
    private comprasService: ComprasService,
    private detalleComprasService: DetalleComprasService,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  decreaseQuantity(index: number): void {
    const item = this.cartItems[index];
    this.cartService.updateQuantity(index, item.cantidad - 1);
    this.loadCart();
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    this.loadCart();
  }

  async checkout() {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      alert('Debes iniciar sesión para comprar.');
      this.router.navigate(['/login']);
      return;
    }
    const compra = {
      total: this.total,
      usuario_id: user.id,
      detalles: this.cartItems.map(item => ({
        producto_id: item.product.id,
        cantidad: item.cantidad,
        precio_unitario: item.product.precio
      }))
    };
    const compraId = await this.comprasService.addCompra(compra);
    if (!compraId) {
      alert('Error al registrar la compra.');
      return;
    }
    alert('Compra realizada con éxito. ¡Gracias!');
    this.cartService.clearCart();
    if (user.role === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  async processPurchase(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      this.modalService.open('Debes iniciar sesión para comprar.');
      this.router.navigate(['/login']);
      return;
    }

    const compra = {
      total: this.total,
      usuario_id: user.id,
      detalles: this.cartItems.map(item => ({
        producto_id: item.product.id,
        cantidad: item.cantidad,
        precio_unitario: item.product.precio
      }))
    };

    try {
      const compraId = await this.comprasService.addCompra(compra);
      if (compraId) {
        let allDetailsAdded = true;
        for (const item of this.cartItems) {
          const detalle: DetalleCompra = {
            producto_id: item.product.id,
            cantidad: item.cantidad,
            precio_unitario: item.product.precio,
            compra_id: compraId,
            usuario_id: user.id
          };
          const detailAdded = await this.detalleComprasService.addDetalleCompra(detalle, compraId, user.id);
          if (!detailAdded) {
            allDetailsAdded = false;
            break;
          }
        }

        if (allDetailsAdded) {
          this.cartService.clearCart();
          this.loadCart();
          this.modalService.open('Compra realizada con éxito, ¡Gracias!');
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.modalService.open('Error al guardar detalles de la compra.');
        }
      } else {
        this.modalService.open('Error al crear la compra.');
      }
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      this.modalService.open('Error al procesar la compra.');
    }
  }
}
