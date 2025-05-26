import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

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

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  async updateProfile() {
    if (!this.user) return;
    if (this.currentPassword !== this.user.contrasena) {
      this.errorMessage = 'Contraseña actual incorrecta.';
      return;
    }
    const updatedUser: User = { ...this.user };
    if (this.newUsuario) updatedUser.usuario = this.newUsuario;
    if (this.newPassword) updatedUser.contrasena = this.newPassword;
    // Aquí deberías llamar a un método de AuthService para actualizar el usuario en Supabase
    // await this.authService.updateUser(updatedUser);
    alert('Perfil actualizado correctamente.');
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
