import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent]
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  quantity: number = 1;
  showModal: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.quantity = 1;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
  }

  addToCart(): void {
    if (this.selectedProduct) {
      this.cartService.addToCart(this.selectedProduct, this.quantity);
      alert('Producto agregado al carrito correctamente.');
      this.closeModal();
    }
  }
}
