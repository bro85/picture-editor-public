import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorStamps6Component } from './constructor-stamps6.component';
import { ConstructorStamps6RoutingModule } from './constructor-stamps6-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SiteTitleModule } from '../../components/site-title/site-title.module';
import { StepResultModule } from '../../components/step-result/step-result.module';
import { EditFormModule } from '../../components/edit-form/edit-form.module';
import { Step1ResultModule } from '../../components/step1-result/step1-result.module';

@NgModule({
  declarations: [
    ConstructorStamps6Component
  ],
  exports: [
    ConstructorStamps6Component
  ],
  imports: [
    CommonModule,
    ConstructorStamps6RoutingModule,
    TranslateModule,
    SiteTitleModule,
    StepResultModule,
    EditFormModule,
    Step1ResultModule
  ]
})
export class ConstructorStamps6Module {}
