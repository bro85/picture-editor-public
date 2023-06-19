import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StoreService } from '../../services/store.service';
import { FilesListService } from '../../services/files-list.service';
import { IStepResult } from '../../interfaces/step1-result.interface';
import { DecimalPipe } from '@angular/common';
import { IStepResultButton } from '../../interfaces/step-result-button.interface';

@Component({
  selector: 'app-step2-result',
  templateUrl: './step2-result.component.html',
  styleUrls: ['./step2-result.component.scss']
})
export class Step2ResultComponent implements OnInit, OnDestroy {

  @Input() stepResultButton: IStepResultButton;
  public orderData: string[] = [];
  private _amount: number = 0;
  private _costPerItem: string = '';
  private _files: string[] = [];
  private _orderType: string = '';
  private _serviceOrderSubscriber: Subscription;
  private _serviceCurrentLanguageSubscriber: Subscription;
  private _totalCost: string = '';

  constructor(private _translate: TranslateService,
              private _storeService: StoreService,
              private _filesListService: FilesListService,
              private _decimalPipe: DecimalPipe) { }

  getFiles(): void {
    this._files = this._filesListService.getFilesList().map( item => item.name );
  }

  getShowData(): IStepResult[] {
    switch (this._orderType) {
      case 'envelope':
        return [
          {
            translateKey: 'steps.step2.results.envelope.amount',
            params: this._amount
          },
          {
            translateKey: 'steps.step2.results.envelope.price',
            params: this._totalCost
          }
        ]
      case 'postcard':
        return [
          {
            translateKey: 'steps.step2.results.postcard.amount',
            params: this._amount
          },
          {
            translateKey: 'steps.step2.results.postcard.price',
            params: this._totalCost
          }
        ]
      case 'stamps-6':
        return [
          {
            translateKey: 'steps.step2.results.stamps6.amount',
            params: this._amount
          },
          {
            translateKey: 'steps.step2.results.stamps6.price',
            params: this._totalCost
          }
        ]
      case 'stamps-9':
        return [
          {
            translateKey: 'steps.step2.results.stamps9.amount',
            params: this._amount
          },
          {
            translateKey: 'steps.step2.results.stamps9.price',
            params: this._totalCost
          }
        ]
      case 'stamps-28':
        return [
          {
            translateKey: 'steps.step2.results.stamps28.amount',
            params: this._amount
          },
          {
            translateKey: 'steps.step2.results.stamps28.price',
            params: this._totalCost
          }
        ]
      case 'stamps-28-difference':
        return [
          {
            translateKey: 'steps.step2.results.stamps28Difference.amount',
            params: this._amount
          },
          {
            translateKey: 'steps.step2.results.stamps28Difference.price',
            params: this._totalCost
          }
        ]
      default:
        console.error('fill the type field');
        return [{
          translateKey: 'undefined',
          params: 'undefined'
        }]
    }
  }

  getTranslates(): void {
    this._serviceCurrentLanguageSubscriber = this._storeService.currentLanguage.subscribe( () => {
      this.orderData = [];
      this.setFilesListToOrderData();
      const array = this.getShowData();
      array.forEach( item => {
        this._translate.get( item.translateKey, {params: item.params}).subscribe((res) => {
          this.orderData[this.orderData.length] = res;
        });
      } );
    } );
  }

  ngOnDestroy(): void {
    this._serviceCurrentLanguageSubscriber.unsubscribe();
    this._serviceOrderSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeToStoreServiceOrder();
    this.getFiles();
  }

  setFilesListToOrderData(): void {
    this.orderData[this.orderData.length] = this._files.join(', ');
  }

  subscribeToStoreServiceOrder(): void {
    this._serviceOrderSubscriber = this._storeService.order.subscribe( value => {
      this._amount = value.totalPages;
      this._costPerItem = value.costPerItem!;
      this._orderType = value.type;
      this._totalCost = this._decimalPipe.transform(value.totalCost/100, '1.2-2')!;
      this.getTranslates();
    } );
  }

}
