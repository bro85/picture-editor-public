import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteFooterComponent } from './site-footer.component';
import { SwitchLanguageModule } from '../switch-language/switch-language.module';
import { SocialModule } from '../social/social.module';
import { TranslateModule } from '@ngx-translate/core';
import { MenuFooterModule } from '../menu-footer/menu-footer.module';

@NgModule({
  declarations: [
    SiteFooterComponent
  ],
  exports: [
    SiteFooterComponent
  ],
  imports: [
    CommonModule,
    SwitchLanguageModule,
    SocialModule,
    TranslateModule,
    MenuFooterModule
  ]
})
export class SiteFooterModule { }
