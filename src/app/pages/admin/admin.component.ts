import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  users: User[] = [];
  newProduct: Product = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    imagen: ''
  };

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user || user.username !== 'admin1' || user.password !== 'Admin#123') {
      this.router.navigate(['/login']);
    } else {
      this.loadProducts();
      this.loadUsers();
    }
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  loadUsers(): void {
    this.users = this.authService.getUsers();
  }

  addProduct(): void {
    const productToAdd: Product = {
      id: this.products.length + 1,
      nombre: this.newProduct.nombre,
      descripcion: this.newProduct.descripcion,
      precio: this.newProduct.precio,
      categoria: this.newProduct.categoria,
      imagen: this.newProduct.imagen
    };

    if (this.productService.addProduct(productToAdd)) {
      alert('Producto agregado correctamente.');
      this.loadProducts();
      this.newProduct = { id: 0, nombre: '', descripcion: '', precio: 0, categoria: '', imagen: '' };
    } else {
      alert('Ya existe un producto con ese nombre o URL de imagen.');
    }
  }

  deleteProduct(index: number): void {
    this.productService.deleteProduct(index);
    this.loadProducts();
  }

  deleteUser(index: number): void {
    this.authService.deleteUser(index);
    this.loadUsers();
  }

  logout(): void {
    this.authService.logout();
  }
}
