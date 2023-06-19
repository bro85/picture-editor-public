import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadedPicComponent } from './uploaded-pic.component';

@NgModule({
  declarations: [
    UploadedPicComponent
  ],
  exports: [
    UploadedPicComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UploadedPicModule { }
