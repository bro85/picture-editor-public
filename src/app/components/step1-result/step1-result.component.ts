import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { IStepResult } from '../../interfaces/step1-result.interface';
import { IStepResultButton } from '../../interfaces/step-result-button.interface';

@Component({
  selector: 'app-step1-result',
  templateUrl: './step1-result.component.html',
  styleUrls: ['./step1-result.component.scss']
})
export class Step1ResultComponent implements OnInit, OnDestroy {

  public orderData: string[] = [];
  private _serviceOrderSubscriber: Subscription;
  private _serviceCurrentLanguageSubscriber: Subscription;
  private _orderType: string = '';
  private _costPerItem: string = '';

  @Input() public stepResultButton: IStepResultButton;

  constructor(private _translate: TranslateService,
    private _storeService: StoreService) { }

  getShowData(): IStepResult[] {
    switch (this._orderType) {
      case 'envelope-c6':
        return [
          {
            translateKey: 'steps.step1.results.envelope.totalStamps'
          },
          {
            translateKey: 'steps.step1.results.envelope.costPerItem',
            params: this._costPerItem
          }
        ]
      case 'envelope-dl':
        return [
          {
            translateKey: 'steps.step1.results.envelope.totalStamps'
          },
          {
            translateKey: 'steps.step1.results.envelope.costPerItem',
            params: this._costPerItem
          }
        ]
      case 'postcard':
        return [
          {
            translateKey: 'steps.step1.results.postcard.totalStamps'
          },
          {
            translateKey: 'steps.step1.results.postcard.costPerItem',
            params: this._costPerItem
          }
        ]
      case 'stamps-6':
        return [
          {
            translateKey: 'steps.step1.results.stamps6.totalStamps'
          },
          {
            translateKey: 'steps.step1.results.stamps6.costPerItem',
            params: this._costPerItem
          }
        ]
      case 'stamps-9':
        return [
          {
            translateKey: 'steps.step1.results.stamps9.totalStamps'
          },
          {
            translateKey: 'steps.step1.results.stamps9.costPerItem',
            params: this._costPerItem
          }
        ]
      case 'stamps-28':
        return [
          {
            translateKey: 'steps.step1.results.stamps28.totalStamps'
          },
          {
            translateKey: 'steps.step1.results.stamps28.costPerItem',
            params: this._costPerItem
          }
        ]
      case 'stamps-28-difference':
        return [
          {
            translateKey: 'steps.step1.results.stamps28Difference.totalStamps'
          },
          {
            translateKey: 'steps.step1.results.stamps28Difference.costPerItem',
            params: this._costPerItem
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
      const array = this.getShowData();
      array.forEach( item => {
        this._translate.get( item.translateKey, {params: item.params}).subscribe((res) => {
          this.orderData[this.orderData.length] = res;
        });
      } );
    } );
  }

  ngOnDestroy(): void {
    this._serviceOrderSubscriber.unsubscribe();
    this._serviceCurrentLanguageSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeToStoreServiceOrder();
  }

  subscribeToStoreServiceOrder(): void {
    this._serviceOrderSubscriber = this._storeService.order.subscribe( value => {
      this._orderType = value.type;
      this._costPerItem = value.costPerItem!;
      this.getTranslates();
    } );
  }

}
