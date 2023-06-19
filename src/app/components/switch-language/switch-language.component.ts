import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-switch-language',
  templateUrl: './switch-language.component.html',
  styleUrls: ['./switch-language.component.scss']
})
export class SwitchLanguageComponent implements OnInit, OnDestroy {

  @Input() addingClass = '';

  public isOpen: boolean = false;
  public currentLanguage: string = this._storeService.currentLanguage.value;
  public languages: Array<string> = this._storeService.languages;

  constructor(private _storeService: StoreService,
              private _languageService: LanguageService) {}

  changeLanguage(language: string): void {
    this._languageService.changeLanguage(language);
    this.isOpen = false;
  }

  ngOnInit() {
    this._storeService.currentLanguage.subscribe( value => {
      this.currentLanguage = value;
    } );
  }

  ngOnDestroy() {
    this._storeService.currentLanguage.unsubscribe();
  }

  @HostListener('document:click', [])
  onDocumentClick(): void {
    this.isOpen = false;
  }

  wrapperClick(e: MouseEvent) {
    e.stopPropagation();
  }
}
