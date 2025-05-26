import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { User } from '../../core/models/user.model';
import { Categoria } from '../../core/models/categoria.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  users: User[] = [];
  categorias: Categoria[] = [];
  newProduct: Product = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoria_id: 0
  };
  newCategoria: string = '';

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts();
    this.users = await this.authService.getUsers();
    this.categorias = await this.categoriaService.getCategorias();
  }

  getCategoriaNombre(categoriaId: number | undefined): string {
    if (!categoriaId) return 'Sin categoría';
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria?.nombre || 'Sin categoría';
  }

  async addProduct() {
    const ok = await this.productService.addProduct(this.newProduct);
    if (ok) {
      alert('Producto agregado correctamente.');
      this.products = await this.productService.getProducts();
      this.newProduct = { id: 0, nombre: '', descripcion: '', precio: 0, imagen: '', categoria_id: 0 };
    } else {
      alert('Error al agregar producto.');
    }
  }

  async deleteProduct(id: number) {
    const ok = await this.productService.deleteProduct(id);
    if (ok) {
      this.products = await this.productService.getProducts();
    }
  }

  async deleteUser(id: number) {
    const ok = await this.authService.deleteUser(id);
    if (ok) {
      this.users = await this.authService.getUsers();
    }
  }

  async addCategoria() {
    if (this.newCategoria.trim()) {
      const ok = await this.categoriaService.addCategoria({ id: 0, nombre: this.newCategoria });
      if (ok) {
        this.categorias = await this.categoriaService.getCategorias();
        this.newCategoria = '';
      }
    }
  }

  async deleteCategoria(id: number) {
    const ok = await this.categoriaService.deleteCategoria(id);
    if (ok) {
      this.categorias = await this.categoriaService.getCategorias();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
