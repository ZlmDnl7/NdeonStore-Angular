import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/styles/global.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class AppComponent implements OnInit {
  title = 'ndeon-store';

  constructor(private router: Router) {}

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
  }
}
