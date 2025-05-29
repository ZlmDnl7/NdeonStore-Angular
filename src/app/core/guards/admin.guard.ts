import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    if (user && user.role === 'admin') {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
} 