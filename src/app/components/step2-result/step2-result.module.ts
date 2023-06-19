import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Step2ResultComponent } from './step2-result.component';
import { TranslateModule } from '@ngx-translate/core';
import { StepResultModule } from '../step-result/step-result.module';

@NgModule({
  declarations: [
    Step2ResultComponent
  ],
  exports: [
    Step2ResultComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    StepResultModule
  ],
  providers: [
    DecimalPipe
  ]
})
export class Step2ResultModule { }
