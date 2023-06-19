import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryFormComponent } from './delivery-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NiceCheckModule } from '../../nice-check/nice-check.module';
import { ResultInfoModule } from '../../result-info/result-info.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    DeliveryFormComponent
  ],
  exports: [
    DeliveryFormComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NiceCheckModule,
    ResultInfoModule,
    NgxMaskModule.forRoot(),
  ]
})
export class DeliveryFormModule {}
