import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private _translate: TranslateService,
    private _storeService: StoreService) {
  }

  public setDefaultLanguage(): void {
    this._translate.setDefaultLang( this._storeService.currentLanguage.value );
  }

  public changeLanguage(value: string): void {
    this._translate.use(value);
    this._storeService.currentLanguage.next(value);
  }

}
