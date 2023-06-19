import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StoreService } from '../../services/store.service';
import { IFooterMenu } from '../../interfaces/footer-menu.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: '[site__footer-menu]',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.scss'],
  animations: [
    trigger('accordion', [
      state('void', style({
        height: '0'
      })),
      state('out', style({
        height: '*'
      })),
      state('in', style({
        height: '0'
      })),
      transition('* => *', animate('300ms ease-in'))
    ])
  ]
})
export class MenuFooterComponent implements OnInit, OnDestroy {

  public MENU: IFooterMenu[] = [];
  public canShow: {[index: string]: string} = {};

  constructor(private _translate: TranslateService,
              private _storeService: StoreService) {}

  ngOnInit(): void {

    // create new Object for footer menu with translations and links which are located in different objects
    this._storeService.currentLanguage.subscribe( value => {
      this.MENU = [];
      this._translate.get('footerMenu').subscribe((res) => {
        const linksColumns = Object.values(this._links[value]);
        linksColumns.forEach( (item: Array<string>, index) => {
          const columnTitle: string = 'column' + (index+1);
          this.MENU[index] = {
            title: res[columnTitle]['title'],
            items: []
          };
          this.canShow[columnTitle] = 'in';
          item.forEach( (subItem, subIndex) => {
            this.MENU[index]['items'][subIndex] = {
              href: subItem,
              text: res[columnTitle].items[subIndex]
            };
          } );
        } );
      });

    } );

  }

  ngOnDestroy(): void {
    this._storeService.currentLanguage.unsubscribe();
  }

  toggleShow(i: number): void {
    const oldCanShow = this.canShow['column' + (i+1)];
    if ( oldCanShow === 'in' ){
      this.canShow['column' + (i+1)] = 'out';
    } else {
      this.canShow['column' + (i+1)] = 'in';
    }
  }

}
