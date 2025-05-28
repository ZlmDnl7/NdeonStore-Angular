import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', loadComponent: () => import('./admin.component').then(m => m.AdminComponent) }
    ])
  ]
})
export class AdminModule { } 