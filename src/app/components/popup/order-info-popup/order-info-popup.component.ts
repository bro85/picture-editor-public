import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { IOrder } from '../../../interfaces/order.interface';
import { IStepResult } from '../../../interfaces/step1-result.interface';
import { TranslateService } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order-info-popup',
  templateUrl: './order-info-popup.component.html',
  styleUrls: ['./order-info-popup.component.scss']
})
export class OrderInfoPopupComponent implements OnInit, OnDestroy {

  public branchIndex: string;
  public isVisiblePopup: boolean = false;
  public order: IOrder;
  public orderData: string[] = [];
  public totalCost: string;
  public totalCostForOrder: string; // The cost for order without delivery
  public deliveryType: string = '';
  public description: {
    type: string;
    cost: string;
  };
  private _costPerItem: string = '';
  private _orderInfoPopupSubscriber: Subscription;
  private _orderSubscriber: Subscription;
  private _orderType: string = '';
  private _totalPages: number;
  private _serviceCurrentLanguageSubscriber: Subscription;

  constructor(private _storeService: StoreService,
              private _translate: TranslateService,
              private _decimalPipe: DecimalPipe) {}

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
          },
          {
            translateKey: 'steps.step2.results.envelope.amount',
            params: this._totalPages
          },
          {
            translateKey: 'steps.step2.results.envelope.price',
            params: this.totalCostForOrder
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
          },
          {
            translateKey: 'steps.step2.results.envelope.amount',
            params: this._totalPages
          },
          {
            translateKey: 'steps.step2.results.envelope.price',
            params: this.totalCostForOrder
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
          },
          {
            translateKey: 'steps.step2.results.postcard.amount',
            params: this._totalPages
          },
          {
            translateKey: 'steps.step2.results.postcard.price',
            params: this.totalCostForOrder
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
          },
          {
            translateKey: 'steps.step2.results.stamps6.amount',
            params: this._totalPages
          },
          {
            translateKey: 'steps.step2.results.stamps6.price',
            params: this.totalCostForOrder
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
          },
          {
            translateKey: 'steps.step2.results.stamps9.amount',
            params: this._totalPages
          },
          {
            translateKey: 'steps.step2.results.stamps9.price',
            params: this.totalCostForOrder
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
          },
          {
            translateKey: 'steps.step2.results.stamps28.amount',
            params: this._totalPages
          },
          {
            translateKey: 'steps.step2.results.stamps28.price',
            params: this.totalCostForOrder
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
          },
          {
            translateKey: 'steps.step2.results.stamps28Difference.amount',
            params: this._totalPages
          },
          {
            translateKey: 'steps.step2.results.stamps28Difference.price',
            params: this.totalCostForOrder
          }
        ]
      default:
        return [{
          translateKey: 'undefined',
          params: 'undefined'
        }]
    }
  }

  getTranslates(): void {
    this._serviceCurrentLanguageSubscriber = this._storeService.currentLanguage.subscribe( () => {
      let cost = this._decimalPipe.transform( this.order.totalCostWithDelivery/100, '1.2-2' );
      this.orderData = [];
      const array = this.getShowData();
      array.forEach( item => {
        this._translate.get( item.translateKey, {params: item.params}).subscribe((res) => {
          this.orderData[this.orderData.length] = res;
        });
      } );

      if ( this.order.deliveryType === 'self-pickup' ){
        this._translate.get( 'popup.orderInfo.deliverySelfPickup' ).subscribe((res) => {
          this.deliveryType = res;
        });
      }

      if ( this.order.deliveryType === 'registered-letter' ){
        this._translate.get( 'popup.orderInfo.deliveryRegisteredLetter' ).subscribe((res) => {
          this.deliveryType = res;
        });
      }

      this._translate.get( 'popup.orderInfo.branchIndex', {params: this.order.branchIndex}).subscribe((res) => {
        this.branchIndex = res;
      });

      this._translate.get( 'popup.orderInfo.totalCost', {params: cost}).subscribe((res) => {
        this.totalCost = res;
      });

    } );
  }

  hidePopup(): void {
    this._storeService.OrderInfoPopup.next({
      isVisible: false
    });
  }

  ngOnDestroy(): void {
    this._orderInfoPopupSubscriber.unsubscribe();
    this._orderSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeToOrderInfoPopup();
    this.subscribeToStoreServiceOrder();
  }

  onClosePopup(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.hidePopup();
  }

  subscribeToOrderInfoPopup(): void {
    this._orderInfoPopupSubscriber = this._storeService.OrderInfoPopup.subscribe( value => {
      this.isVisiblePopup = value.isVisible;
    } );
  }

  subscribeToStoreServiceOrder(): void {
    this._orderSubscriber = this._storeService.order.subscribe( value => {
      this._orderType = value.type;
      this._costPerItem = value.costPerItem!;
      this._totalPages = value.totalPages;
      this.totalCostForOrder = this._decimalPipe.transform( value.totalCost/100, '1.2-2' )!;
      this.order = Object.assign( value );
      this.getTranslates();
    } );
  }

}
