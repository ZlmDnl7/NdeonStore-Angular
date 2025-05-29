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

    // Allow access to login and register if NOT logged in
    if ((path === 'login' || path === 'register') && !isLoggedIn) {
      return true;
    }

    // If logged in and trying to access login or register, redirect
    if ((path === 'login' || path === 'register') && isLoggedIn) {
       if (user && user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
        return false;
    }

    // If not logged in and trying to access other routes, redirect to login
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    // If logged in and trying to access other routes, allow access (with admin check)
    if (user && user.role === 'admin' && path !== 'admin' && path !== 'login' && path !== 'register') {
        this.router.navigate(['/admin']);
        return false;
    }

    return true;
  }
}
