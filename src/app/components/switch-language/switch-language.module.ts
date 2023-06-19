import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchLanguageComponent } from './switch-language.component';

@NgModule({
  declarations: [
    SwitchLanguageComponent
  ],
  exports: [
    SwitchLanguageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SwitchLanguageModule { }
