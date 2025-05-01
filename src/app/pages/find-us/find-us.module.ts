import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FindUsComponent } from './find-us.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FindUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FindUsComponent }]),
    SharedModule
  ]
})
export class FindUsModule {}
