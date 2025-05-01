import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CartComponent,
    RouterModule.forChild([
      { path: '', component: CartComponent }
    ])
  ]
})
export class CartModule { }
