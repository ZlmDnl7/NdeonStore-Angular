import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ProductComponent,
    RouterModule.forChild([
      { path: '', component: ProductComponent }
    ])
  ]
})
export class ProductModule { }
