import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new Subject<{ message: string, isVisible: boolean }>();

  modalState$ = this.modalState.asObservable();

  open(message: string): void {
    this.modalState.next({ message, isVisible: true });
  }

  close(): void {
    this.modalState.next({ message: '', isVisible: false });
  }
} 