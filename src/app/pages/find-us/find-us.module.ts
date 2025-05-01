import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindUsComponent } from './find-us.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FindUsComponent,
    RouterModule.forChild([
      { path: '', component: FindUsComponent }
    ])
  ]
})
export class FindUsModule { }
