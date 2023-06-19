import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorStamps9Component } from './constructor-stamps9.component';
import { ConstructorStamps9RoutingModule } from './constructor-stamps9-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SiteTitleModule } from '../../components/site-title/site-title.module';
import { StepResultModule } from '../../components/step-result/step-result.module';
import { EditFormModule } from '../../components/edit-form/edit-form.module';
import { Step1ResultModule } from '../../components/step1-result/step1-result.module';

@NgModule({
  declarations: [
    ConstructorStamps9Component
  ],
  exports: [
    ConstructorStamps9Component
  ],
  imports: [
    CommonModule,
    ConstructorStamps9RoutingModule,
    TranslateModule,
    SiteTitleModule,
    StepResultModule,
    EditFormModule,
    Step1ResultModule
  ]
})
export class ConstructorStamps9Module { }
