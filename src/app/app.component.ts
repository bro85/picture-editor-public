import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LanguageService} from './services/language.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'own-stamp-ng';
  constructor(private _languageService: LanguageService,
              @Inject(DOCUMENT) private _document: Document,
              private _storeService: StoreService) {}

  ngOnInit() {
    this._languageService.setDefaultLanguage();
    this.setLangAttribute();
  }

  setLangAttribute(): void {
    this._storeService.currentLanguage.subscribe( value => {
      this._document.documentElement.lang = value === 'ua' ? 'uk' : value;
    } );
  }

}
