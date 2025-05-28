import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', loadComponent: () => import('./login.component').then(m => m.LoginComponent) }
    ])
  ]
})
export class LoginModule { } 