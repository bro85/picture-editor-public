import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { OrderInfoPopupComponent } from './order-info-popup.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderInfoPopupComponent
  ],
  exports: [
    OrderInfoPopupComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    DecimalPipe
  ]
})
export class OrderInfoPopupModule {}
