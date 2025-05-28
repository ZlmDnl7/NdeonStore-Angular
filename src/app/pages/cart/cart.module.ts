import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', loadComponent: () => import('./cart.component').then(m => m.CartComponent) }
    ])
  ]
})
export class CartModule { } 