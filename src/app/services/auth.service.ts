import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { User } from '../core/models/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;

  constructor(private api: ApiService, private router: Router) {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  async login(usuario: string, contrasena: string): Promise<User | null> {
    try {
      const res: any = await firstValueFrom(this.api.post('/auth/login', { usuario, contrasena }));
      if (res && res.access_token && res.user) {
        sessionStorage.setItem('access_token', res.access_token);
        sessionStorage.setItem('currentUser', JSON.stringify(res.user));
        this.currentUser = res.user;
        return res.user;
      }
      return null;
    } catch (err: any) {
      return null;
    }
  }

  async register(usuario: string, contrasena: string): Promise<string | null> {
    try {
      await firstValueFrom(this.api.post('/auth/register', { usuario, contrasena }));
      return null;
    } catch (err: any) {
      if (err.error && err.error.message) {
        return err.error.message;
      }
      return 'Error al registrar usuario.';
    }
  }

  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.currentUser) {
      const savedUser = sessionStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('access_token');
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await firstValueFrom(this.api.get<User[]>('/usuarios'));
      return users;
    } catch {
      return [];
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.api.delete(`/usuarios/${id}`));
      return true;
    } catch {
      return false;
    }
  }

  async updateUser(user: User): Promise<boolean> {
    try {
      await firstValueFrom(this.api.put(`/usuarios/${user.id}`, user));
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser = user;
      return true;
    } catch {
      return false;
    }
  }
} 