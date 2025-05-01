import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AdminComponent,
    RouterModule.forChild([
      { path: '', component: AdminComponent }
    ])
  ]
})
export class AdminModule { }
