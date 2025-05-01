import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent]
})
export class FindUsComponent {}
