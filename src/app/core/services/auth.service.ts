import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  constructor(private router: Router) {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }

    const loggedUser = sessionStorage.getItem('currentUser');
    if (loggedUser) {
      this.currentUser = JSON.parse(loggedUser);
    }
  }

  private validatePassword(password: string): string | null {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (!hasUpperCase) {
      return 'La contraseña debe contener al menos una mayúscula.';
    }
    if (!hasLowerCase) {
      return 'La contraseña debe contener al menos una minúscula.';
    }
    if (!hasNumber) {
      return 'La contraseña debe contener al menos un número.';
    }
    if (!hasSpecialChar) {
      return 'La contraseña debe contener al menos un carácter especial.';
    }
    return null;
  }

  register(fullname: string, username: string, password: string): string | null {
    if (this.users.some(user => user.username === username)) {
      return 'El usuario ya existe.';
    }

    const passwordError = this.validatePassword(password);
    if (passwordError) {
      return passwordError;
    }

    let role: 'user' | 'admin' = 'user';
    if (username === 'admin1' && password === 'Admin#123') {
      role = 'admin';
    }

    const user: User = { id: this.users.length + 1, username, password, fullname, role };
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return null;
  }

  login(username: string, password: string): User | null {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  }

  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  getUsers(): User[] {
    return this.users.filter(user => user.username !== 'admin1');
  }

  deleteUser(index: number): void {
    this.users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.username === this.currentUser?.username);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.currentUser = updatedUser;
      localStorage.setItem('users', JSON.stringify(this.users));
      sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  }
}
