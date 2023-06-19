import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IConstructorConfig } from '../../interfaces/constructor-config.interface';
import { IOrder } from '../../interfaces/order.interface';
import { TranslateService } from '@ngx-translate/core';
import { StoreService } from '../../services/store.service';
import { IImagesToFill } from '../../interfaces/images-to-fill.interface';
import { IStepResultButton } from '../../interfaces/step-result-button.interface';

@Component({
  selector: 'app-constructor-stamps9',
  templateUrl: './constructor-stamps9.component.html',
  styleUrls: ['./constructor-stamps9.component.scss']
})
export class ConstructorStamps9Component implements OnInit {

  @ViewChild('step2') private _step2: ElementRef;

  // Configuration for edit for 9 stamps
  readonly constructorConfig: IConstructorConfig = {
    'type': 'stamps-9',
    'totalStamps': 9,
    'costPerPage': 27000, // the price is in kopecks
    'costPerItem': '12.00',
    'stamp': {
      // resolution - size in pixels of cropped image. Argument - side length in millimeters
      'resolution': {
        'width': this.setResolution(29),
        'height': this.setResolution(31)
      },
      // size - cropped image size in millimeters
      'size': {
        'width': '29 мм',
        'height': '31 мм'
      }
    },
    'background': {
      // background image for order of 6 or 9 stamps. Value in millimeters
      'resolution': {
        'width': this.setResolution(220),
        'height': this.setResolution(154)
      },
      'size': {
        'width': '220 мм',
        'height': '154 мм'
      }
    }
  };
  public fileBtnConfig: IImagesToFill = {
    // Config for .file-btn__input
    'type': 'front', // Where to insert the image. Front side or background.
    'imageNumber': [1,2,3,4,5,6,7,8,9] // Array of images to fill
  };
  public addBackgroundBtnConfig: IImagesToFill = {
    // Config for .image-preview__add-stamp > input
    'type': 'background', // Where to insert the image. Front side or background.
    'imageNumber': [] // Array of images to fill
  };
  public addStampBtnConfig: IImagesToFill = {
    // Config for .image-preview__add-stamp > input
    'type': 'front', // Where to insert the image. Front side or background.
    'imageNumber': [] // Array of images to fill
  };
  public stepData = {
    'inputFile': '',
    'checkboxText': ''
  };
  public stepResultButton: IStepResultButton;

  constructor(private _translate: TranslateService,
              private _storeService: StoreService) {}

  getTranslates() {
    this._storeService.currentLanguage.subscribe( () => {
      this.stepData = {
        'inputFile': '',
        'checkboxText': ''
      };
      this._translate.get('button.inputFile.forAllStamps').subscribe((res) => {
        this.stepData.inputFile = res;
      });
      this._translate.get('steps.step2.checkbox').subscribe((res) => {
        this.stepData.checkboxText = res;
      });
      this._translate.get('button.edit').subscribe((res) => {
        this.stepResultButton.text = res;
      });
    } );
  }

  setOrderData() {
    const order: IOrder = {
      'costPerPage': this.constructorConfig.costPerPage,
      'costPerItem': this.constructorConfig.costPerItem,
      'images': {
        'background': {
          'index': 0,
          'src': ''
        },
        'front': []
      },
      'totalCost': 0,
      'totalCostWithDelivery': 0,
      'totalPages': 0,
      'type': this.constructorConfig.type,
    };
    this._storeService.order.next(order);
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView({behavior: "smooth"});
  }

  scrollToStep2(): void {
    this.scroll( this._step2.nativeElement );
  }

  // setResolution returns size in pixels.
  // Calculated by the formula res=size/2.54*300 (size/2.54 - inch value. 300 - resolution, dpi.)
  // size - side of the cropped image, in millimeters
  setResolution(size: number): number {
    return Math.round( size/10/2.54*300 );
  }

  setStep1ResultButton(): void {
    this.stepResultButton = {
      routerLink: '/',
      class: 'link link_edit',
      text: ''
    };
  }

  ngOnInit(): void {
    this.setOrderData();
    this.setStep1ResultButton();
    this.getTranslates();
  }

}
