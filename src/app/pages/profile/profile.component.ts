import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Categoria } from '../../core/models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  errorMessage: string = '';
  newUsuario: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  products: Product[] = [];
  categorias: Categoria[] = [];
  showModal: boolean = false;
  selectedProduct: Product | null = null;
  quantity: number = 1;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private categoriaService: CategoriaService
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
    this.products = await this.productService.getProducts();
    this.categorias = await this.categoriaService.getCategorias();
  }

  async updateProfile() {
    if (!this.user) return;
    if (this.currentPassword !== this.user.contrasena) {
      this.errorMessage = 'Contraseña actual incorrecta.';
      return;
    }
    const updatedUser: User = { ...this.user };
    if (this.newUsuario) updatedUser.usuario = this.newUsuario;
    if (this.newPassword) updatedUser.contrasena = this.newPassword;
    const success = await this.authService.updateUser(updatedUser);
    if (success) {
      alert('Perfil actualizado correctamente.');
      this.router.navigate(['/profile']);
    } else {
      this.errorMessage = 'Error al actualizar el perfil.';
    }
  }

  getCategoriaNombre(categoriaId: number | undefined): string {
    if (!categoriaId) return 'Sin categoría';
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria?.nombre || 'Sin categoría';
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

  logout(): void {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }
}
