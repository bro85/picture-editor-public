import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFooterComponent } from './menu-footer.component';



@NgModule({
  declarations: [
    MenuFooterComponent
  ],
  exports: [
    MenuFooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MenuFooterModule { }
