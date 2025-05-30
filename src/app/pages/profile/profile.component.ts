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
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';

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
  private sessionSub: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private categoriaService: CategoriaService,
    private modalService: ModalService
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    this.products = await this.productService.getProducts();
    this.categorias = await this.categoriaService.getCategorias();

    // Suscribirse a los cambios de sesión
    this.sessionSub = this.authService.getLoggedInObservable().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    this.sessionSub?.unsubscribe();
  }

  async updateProfile() {
    if (!this.user) return;
    
    try {
      const updatedUser: User = { ...this.user };
      if (this.newUsuario) updatedUser.usuario = this.newUsuario;
      if (this.newPassword) updatedUser.contrasena = this.newPassword;
      
      const success = await this.authService.updateUser(updatedUser);
      if (success) {
        this.modalService.open('Perfil actualizado correctamente.');
      } else {
        this.errorMessage = 'Error al actualizar el perfil.';
        this.modalService.open('Error al actualizar el perfil.');
      }
    } catch (error) {
      this.errorMessage = 'Error al actualizar el perfil.';
      this.modalService.open('Error al actualizar el perfil.');
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
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 50);
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }
}
