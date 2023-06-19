import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { StoreService } from '../../../services/store.service';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { IOrder } from '../../../interfaces/order.interface';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss'],
})
export class DeliveryFormComponent implements OnInit, OnDestroy {

  public deliveryCost: number = 5000;
  public form: FormGroup;
  public isRegisteredLetter: boolean = false;
  public isSelfPickup: boolean = false;
  public order: IOrder;
  public registeredLetter: FormGroup;
  public resultInfoData: string[][];
  public selfPickup: FormGroup;
  private _currentLanguageSubscriber: Subscription;
  private _storeServiceOrderSubscriber: Subscription;

  constructor(private _translate: TranslateService,
              private _formBuilder: FormBuilder,
              private _storeService: StoreService,
              private _decimalPipe: DecimalPipe) {}

  initForm(): void {
    this.form = new FormGroup({
      surname: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ] ),
      name: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      deliveryType: new FormControl('', [
        Validators.required
      ]),
      confirmation: new FormControl(false, [
        Validators.requiredTrue
      ])
    });

  }

  ngOnDestroy(): void {
    if (this._currentLanguageSubscriber) this._currentLanguageSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToStoreServiceOrder();
  }

  onSelectChange(e: any): void {
    this.order.deliveryType = e.value;
    if (e.value === 'registered-letter'){
      if (this._currentLanguageSubscriber) this._currentLanguageSubscriber.unsubscribe();
      this.isSelfPickup = false;
      this.isRegisteredLetter = true;
      let orderCost = '';
      let deliveryCost = '';
      let totalCost = '';
      let currency = '';
      this._currentLanguageSubscriber = this._storeService.currentLanguage.subscribe( () => {
        this._translate.get( 'currency.uah' ).subscribe( value => {
          currency = value;
        } );
        this._translate.get( 'form.text.orderCost' ).subscribe( value => {
          orderCost = value;
        } );
        this._translate.get( 'form.text.deliveryCost' ).subscribe( value => {
          deliveryCost = value;
        } );
        this._translate.get( 'form.text.totalCost' ).subscribe( value => {
          totalCost = value;
        } );
        // Create array of data of result info
        this.resultInfoData = [
          [ orderCost, this.transformPrice( this.order.totalCost ) + ' ' + currency ],
          [ deliveryCost, this.transformPrice( this.deliveryCost ) + ' ' + currency ],
          [ `<b>${totalCost}</b>`, `<b>${this.transformPrice( this.order.totalCostWithDelivery )} ${currency}</b>` ]
        ];
      } );
      // Add registeredLetter form group
      this.form.addControl( 'registeredLetter', new FormGroup({
        branchIndexRL: new FormControl('', [
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.required
        ]),
        region: new FormControl('', [
          Validators.required
        ]),
        district: new FormControl('', [
          Validators.required
        ]),
        locality: new FormControl('', [
          Validators.required
        ]),
        street: new FormControl('', [
          Validators.required
        ]),
        houseNumber: new FormControl('', [
          Validators.required
        ]),
        apartmentNumber: new FormControl('', [
          Validators.required
        ]),
      }) );
      // Delete selfPickup form group
      this.form.removeControl( 'selfPickup' );
    }
    if (e.value === 'self-pickup'){
      if (this._currentLanguageSubscriber) this._currentLanguageSubscriber.unsubscribe();
      this.isRegisteredLetter = false;
      this.isSelfPickup = true;
      let totalCost = '';
      let currency = '';
      this._currentLanguageSubscriber = this._storeService.currentLanguage.subscribe( () => {
        this._translate.get( 'currency.uah' ).subscribe( value => {
          currency = value;
        } );
        this._translate.get( 'form.text.totalCost' ).subscribe( value => {
          totalCost = value;
        } );
        // Create array of data of result info
        this.resultInfoData = [
          [ `<b>${totalCost}</b>`, `<b>${this.transformPrice( this.order.totalCostWithDelivery )} ${currency}</b>` ]
        ];
      } );
      // Add selfPickup form group
      this.form.addControl( 'selfPickup', new FormGroup({
        branchIndexSP: new FormControl('', [
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.required
        ])
      }) );
      // Delete registeredLetter form group
      this.form.removeControl( 'registeredLetter' );
    }
    this.updateStoreOrder();
  }

  onSubmit(): void {
    if (this.form.valid){
      // Get delivery index
      if (!!this.form.get('registeredLetter') && this.form.get('registeredLetter')?.value.branchIndexRL){
        this.order.branchIndex = this.form.get('registeredLetter')?.value.branchIndexRL;
      } else if (!!this.form.get('selfPickup') && this.form.get('selfPickup')?.value.branchIndexSP){
        this.order.branchIndex = this.form.get('selfPickup')?.value.branchIndexSP;
      }
      this.updateStoreOrder();
      this._storeService.OrderInfoPopup.next({
        isVisible: true
      });
    }
  }

  subscribeToStoreServiceOrder(): void {
    this._storeServiceOrderSubscriber = this._storeService.order.subscribe( value => {
      this.order = Object.assign( value );
      this.order.totalCostWithDelivery = this.order.totalCost + this.deliveryCost;
    } );
  }

  // Transform price to string with 2 sign after coma
  // 'price' - the value in kopecks
  transformPrice(price: number): string {
    return this._decimalPipe.transform( price/100, '1.2-2' )!;
  }

  updateStoreOrder(): void {
    this._storeService.order.next({...this.order});
  }

  onIndexInput(e: any) {
    // Validation. Allow only numbers
    e.target.value = e.target.value.replace(/[^\d]/,'');
  }
}
