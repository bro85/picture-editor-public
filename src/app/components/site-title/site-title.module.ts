import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteTitleComponent } from './site-title.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SiteTitleComponent
  ],
  exports: [
    SiteTitleComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class SiteTitleModule {}
