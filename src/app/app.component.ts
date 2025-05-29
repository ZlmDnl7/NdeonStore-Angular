import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CustomModalComponent } from './shared/custom-modal/custom-modal.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/styles/global.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, CustomModalComponent]
})
export class AppComponent implements OnInit {
  title = 'ndeon-store';

  constructor(private router: Router, private modalService: ModalService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const body = document.body;
        body.classList.remove('login-bg', 'default-bg');

        if (event.urlAfterRedirects.includes('/login') || event.urlAfterRedirects.includes('/register')) {
          body.classList.add('login-bg');
        } else {
          body.classList.add('default-bg');
        }
      });

    this.modalService.modalState$.subscribe(({ message, isVisible }) => {
      const modal = document.querySelector('app-custom-modal') as any;
      if (modal) {
        if (isVisible) {
          modal.open(message);
        } else {
          modal.close();
        }
      }
    });
  }
}
