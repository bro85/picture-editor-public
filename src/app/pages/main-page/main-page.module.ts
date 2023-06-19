import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SiteTitleModule } from '../../components/site-title/site-title.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { Step1Module } from '../../components/steps/step1/step1.module';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  exports: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SiteTitleModule,
    TranslateModule,
    Step1Module
  ]
})
export class MainPageModule { }
