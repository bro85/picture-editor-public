import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Step1ResultComponent } from './step1-result.component';
import { TranslateModule } from '@ngx-translate/core';
import { StepResultModule } from '../step-result/step-result.module';

@NgModule({
  declarations: [
    Step1ResultComponent
  ],
  exports: [
    Step1ResultComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    StepResultModule
  ]
})
export class Step1ResultModule { }
