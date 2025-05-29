import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent {
  message: string = '';
  isVisible: boolean = false;

  open(message: string): void {
    this.message = message;
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }
} 