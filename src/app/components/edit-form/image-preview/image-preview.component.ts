import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { IOrder } from '../../../interfaces/order.interface';
import { IFileData } from '../../../interfaces/file-data.interface';
import { IImagesToFill } from '../../../interfaces/images-to-fill.interface';
import { IConstructorConfig } from '../../../interfaces/constructor-config.interface';
import { IImagesProperties } from '../../../interfaces/images-properties.interface';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit, AfterViewInit, OnDestroy {

  public totalStamps: number = 0;
  public frontImages: IFileData[] = [];
  public backgroundImage: string;
  public minHeight: string;
  public minHeightDummy: string;
  public wrapperClass: {};
  public canShowButtonForBackground: boolean = false;
  public canShowStampButton: boolean = true;
  private _currentSelect: string = '';
  private _orderSubscriber: Subscription;
  private _currentSelectSubscriber: Subscription;

  @Output() imageData: EventEmitter<any> = new EventEmitter<any>();
  @Output() scrollToCropper: EventEmitter<any> = new EventEmitter<any>();
  @Input() addBackgroundBtnConfig: IImagesToFill = {
    'type': '',
    'imageNumber': []
  };
  @Input() addStampBtnConfig: IImagesToFill = {
    'type': '',
    'imageNumber': []
  };
  @Input() constructorConfig: IConstructorConfig = {
    type: '',
    costPerPage: 0,
    costPerItem: '',
    stamp: {
      resolution: {
        width: 0,
        height: 0
      },
      size: {
        width: '',
        height: ''
      }
    },
    background: {
      resolution: {
        width: 0,
        height: 0
      },
      size: {
        width: '',
        height: ''
      }
    }
  };
  @ViewChild('previewWrap') private _previewWrap: ElementRef;
  @ViewChild('previewDummy') private _previewDummy: ElementRef;

  constructor(private _storeService: StoreService) {}

  addImage(e: any, obj: any): void {
    const file = e.target.files[0];
    let _self = this;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // sending data of uploaded image to parent component
      _self.imageData.emit({
        fileName: file.name, // name of uploaded image
        image: {
          resolution: {
            width: obj.image.resolution.width,
            height: obj.image.resolution.height
          },
          size: {
            width: obj.image.size.width,
            height: obj.image.size.height
          }
        },
        imageSrc: reader.result, // image in base64 format
        imagesToFill: {
          type: obj.imagesToFill.type, // Where to insert the image. Front side or background.
          imageNumber: obj.imagesToFill.imageNumber // Number of images to fill
        }
      });
    };
    reader.onerror = function (error) {
      // console.log('Error: ', error);
    };
  }

  addBackground(e: any): void {
    let imageNumberArray: number[] = this.addBackgroundBtnConfig.imageNumber.concat();
    this.addImage(e, {
      image: {
        resolution: {
          width: this.constructorConfig.background!.resolution.width,
          height: this.constructorConfig.background!.resolution.height
        },
        size: {
          width: this.constructorConfig.background!.size.width,
          height: this.constructorConfig.background!.size.height
        }
      },
      imagesToFill: {
        type: this.addBackgroundBtnConfig.type,
        imageNumber: imageNumberArray
      }
    });
    this.scrollToCropper.emit();
    this._storeService.currentSelect.next('background');
  }

  addStamp(e: any, i: number): void {
    let imageNumberArray: number[] = [];
    imageNumberArray.push(i+1);
    this.addImage(e, {
      image: {
        resolution: {
          width: this.constructorConfig.stamp!.resolution.width,
          height: this.constructorConfig.stamp!.resolution.height
        },
        size: {
          width: this.constructorConfig.stamp!.size.width,
          height: this.constructorConfig.stamp!.size.height
        }
      },
      imagesToFill: {
        type: this.addStampBtnConfig.type,
        imageNumber: imageNumberArray
      }
    });
    this.scrollToCropper.emit();
    this._storeService.currentSelect.next('front');
  }

  canShowBackgroundButton(): void {
    this.canShowButtonForBackground = !this.backgroundImage && (this.constructorConfig.type === 'stamps-6' || this.constructorConfig.type === 'stamps-9' || this.constructorConfig.type === 'postcard' || this.constructorConfig.type === 'envelope-c6' || this.constructorConfig.type === 'envelope-dl') && this._currentSelect !== 'background';
  }

  drawImages(order: IOrder): void {
    this.frontImages = order.images.front;
    this.backgroundImage = order.images.background.src;
    this.canShowBackgroundButton();
  }

  setMinHeight(): void {
    if (this.constructorConfig.type === 'stamps-6' || this.constructorConfig.type === 'stamps-9') {
      this.minHeight = Math.floor(this._previewWrap.nativeElement.offsetWidth * this.constructorConfig.background!.resolution.height / this.constructorConfig.background!.resolution.width) + 'px';
    }
    if (this.constructorConfig.type === 'postcard' || this.constructorConfig.type === 'envelope-c6' || this.constructorConfig.type === 'envelope-dl') {
      this.minHeightDummy = Math.floor(this._previewDummy.nativeElement.offsetWidth * this.constructorConfig.background!.resolution.height / this.constructorConfig.background!.resolution.width) + 'px';
    }
  }

  setWrapperClass(): void {
    this.wrapperClass = {
      'image-preview': true,
      'image-preview_envelope': this.constructorConfig.type === 'envelope-c6' || this.constructorConfig.type === 'envelope-dl',
      'image-preview_postcard': this.constructorConfig.type === 'postcard',
      'image-preview__stamps-6': this.constructorConfig.type === 'stamps-6',
      'image-preview__stamps-9': this.constructorConfig.type === 'stamps-9',
      'image-preview__stamps-28': this.constructorConfig.type === 'stamps-28',
      'image-preview__stamps-28-dif': this.constructorConfig.type === 'stamps-28-difference',
    }
  }

  subscribeToStoreServiceOrder(): void {
    this._orderSubscriber = this._storeService.order.subscribe( value => {
      this.drawImages(value);
    } );
  }

  typeEnumeration(): void {
    switch( this.constructorConfig.type ) {
      case 'envelope-c6':
        this.totalStamps = 0;
        break;
      case 'envelope-dl':
        this.totalStamps = 0;
        break;
      case 'postcard':
        this.totalStamps = 0;
        break;
      case 'stamps-6':
        this.totalStamps = 6;
        break;
      case 'stamps-9':
        this.totalStamps = 9;
        break;
      case 'stamps-28':
        this.totalStamps = 28;
        this.canShowStampButton = false;
        break;
      case 'stamps-28-difference':
        this.totalStamps = 28;
        break;
      default:
        console.error('need to set totalStamps');
    }
  }

  ngOnInit(): void {
    // console.log('constructorConfig ', this.constructorConfig);
    this.canShowBackgroundButton();
    this.subscribeToStoreServiceOrder();
    this.subscribeToCurrentSelect();
    this.typeEnumeration();
    this.setWrapperClass();
  }

  ngOnDestroy(): void {
    this._orderSubscriber.unsubscribe();
    this._currentSelectSubscriber.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout( () => {
      this.setMinHeight();
    } );
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setMinHeight();
  }

  rotatePreview(obj: IImagesProperties) {
    this.constructorConfig = {
      ...this.constructorConfig,
      'background': {
        'resolution': {
          'width': obj.resolution.width,
          'height': obj.resolution.height
        },
        'size': {
          'width': obj.size.width,
          'height': obj.size.height
        }
      }
    };
    this.setMinHeight();
  }

  subscribeToCurrentSelect(): void {
    this._currentSelectSubscriber = this._storeService.currentSelect.subscribe( value => {
      this._currentSelect = value;
      this.canShowBackgroundButton();
    } );
  }

}
