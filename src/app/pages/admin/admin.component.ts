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
import { ModalService } from '../../services/modal.service';

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
    private router: Router,
    private modalService: ModalService
  ) {}

  async ngOnInit() {
    try {
      this.products = await this.productService.getProducts();
      this.users = await this.authService.getUsers();
      this.categorias = await this.categoriaService.getCategorias();
      
      if (!this.users || this.users.length === 0) {
        console.log('No users found or error loading users');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
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
      this.modalService.open('Error al subir imagen a Supabase.');
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
        return;
      }
    }
    const ok = await this.productService.addProduct(this.newProduct);
    if (ok) {
      this.modalService.open('Producto agregado correctamente.');
      this.products = await this.productService.getProducts();
      this.newProduct = { id: 0, nombre: '', descripcion: '', precio: 0, imagen: '', categoria_id: 0 };
      this.selectedFile = null;
    } else {
      this.modalService.open('Error al agregar producto.');
    }
  }

  async deleteProduct(id: number) {
    const ok = await this.productService.deleteProduct(id);
    if (ok) {
      this.modalService.open('Producto eliminado correctamente.');
      this.products = await this.productService.getProducts();
    } else {
      this.modalService.open('Error al eliminar producto.');
    }
  }

  async deleteUser(id: number) {
    const ok = await this.authService.deleteUser(id);
    if (ok) {
      this.modalService.open('Usuario eliminado correctamente.');
      this.users = await this.authService.getUsers();
    } else {
      this.modalService.open('Error al eliminar usuario.');
    }
  }

  async addCategoria() {
    if (this.newCategoria.trim()) {
      const ok = await this.categoriaService.addCategoria({ id: 0, nombre: this.newCategoria });
      if (ok) {
        this.modalService.open('Categoría agregada correctamente.');
        this.categorias = await this.categoriaService.getCategorias();
        this.newCategoria = '';
      } else {
        this.modalService.open('Error al agregar categoría.');
      }
    }
  }

  async deleteCategoria(id: number) {
    const ok = await this.categoriaService.deleteCategoria(id);
    if (ok) {
      this.modalService.open('Categoría eliminada correctamente.');
      this.categorias = await this.categoriaService.getCategorias();
    } else {
      this.modalService.open('Error al eliminar categoría.');
    }
  }

  logout(): void {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 50);
  }
}
