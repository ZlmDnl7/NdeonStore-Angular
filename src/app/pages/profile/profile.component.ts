import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
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
  newUsername: string = '';
  currentPassword: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  updateProfile(): void {
    if (!this.user) return;

    if (this.currentPassword !== this.user.password) {
      this.errorMessage = 'Contraseña actual incorrecta.';
      return;
    }

    const updatedUser: User = { ...this.user };
    if (this.newUsername) updatedUser.username = this.newUsername;
    if (this.newPassword) updatedUser.password = this.newPassword;

    this.authService.updateUser(updatedUser);
    alert('Perfil actualizado correctamente.');
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
  }
}
