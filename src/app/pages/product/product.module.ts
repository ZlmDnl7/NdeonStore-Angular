import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', loadComponent: () => import('./product.component').then(m => m.ProductComponent) }
    ])
  ]
})
export class ProductModule { } 