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
import { supabase } from '../../supabaseClient';

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
  selectedFile: File | null = null;

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async uploadImageToSupabase(file: File): Promise<string | null> {
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filePath = `${Date.now()}_${cleanName}`;
    const { data, error } = await supabase.storage.from('product-images').upload(filePath, file);
    if (error) {
      console.error('Error al subir imagen a Supabase:', error.message, error);
      return null;
    }
    const { data: publicUrl } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return publicUrl.publicUrl;
  }

  async addProduct() {
    if (this.selectedFile) {
      const imageUrl = await this.uploadImageToSupabase(this.selectedFile);
      if (imageUrl) {
        this.newProduct.imagen = imageUrl;
      } else {
        alert('Error al subir la imagen.');
        return;
      }
    }
    const ok = await this.productService.addProduct(this.newProduct);
    if (ok) {
      alert('Producto agregado correctamente.');
      this.products = await this.productService.getProducts();
      this.newProduct = { id: 0, nombre: '', descripcion: '', precio: 0, imagen: '', categoria_id: 0 };
      this.selectedFile = null;
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
