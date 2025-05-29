import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    const path = route.routeConfig?.path;

    // Permitir acceso a login y register solo si NO está logueado
    if (path === 'login' || path === 'register') {
      if (isLoggedIn) {
        if (user && user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
        return false;
      }
      return true;
    }

    // Si es admin y la ruta no es admin, redirigir a /admin
    if (user && user.role === 'admin' && path !== 'admin') {
      this.router.navigate(['/admin']);
      return false;
    }

    // Proteger rutas normales
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
