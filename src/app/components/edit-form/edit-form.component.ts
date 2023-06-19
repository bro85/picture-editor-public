import { Component, ElementRef, EventEmitter, Input, Output, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ISecondStepData } from '../../interfaces/second-step-data.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFile } from '../../interfaces/file.interface';
import { ICropperConfig } from '../../interfaces/cropper-config.interface';
import { IConstructorConfig } from '../../interfaces/constructor-config.interface';
import { CropperPicComponent } from './cropper-pic/cropper-pic.component';
import { IImagesToFill } from '../../interfaces/images-to-fill.interface';
import { FilesListService } from '../../services/files-list.service';
import { StoreService } from '../../services/store.service';
import { IImagesProperties } from '../../interfaces/images-properties.interface';
import { FormatWrapComponent } from './format-wrap/format-wrap.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { IOrder } from '../../interfaces/order.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit, OnDestroy {

  public canShowSubmitBtn = false;
  public costPerPage: number;
  public cropperConfig: ICropperConfig = {
    fileIndex: 0,
    imageSrc: '',
    image: {
      resolution: {
        width: 0,
        height: 0
      },
      size: {
        width: '',
        height: ''
      }
    },
    imagesToFill: {
      type: '',
      imageNumber: []
    }
  };
  public files: Array<IFile> = []; // Array of files names. It consists of objects with indexes and names of files.
  public form: FormGroup;
  public imageChangedEvent: any = '';
  public imageProperties: IImagesProperties;
  public imageSrc = '';
  public totalLists = 1;
  public totalPrice: number;
  private _currentFileInFileList = 0;
  private _storeServiceOrder: IOrder;
  private _storeServiceSubscriber: Subscription;

  @ViewChild('cropper') private _cropper: CropperPicComponent;
  @ViewChild('cropperWrap') private _cropperWrap: ElementRef;
  @ViewChild('formatWrap') private _formatWrap: FormatWrapComponent;
  @ViewChild('imagePreview') private _imagePreview: ImagePreviewComponent;
  @Input() stepData: ISecondStepData = {
    inputFile: '',
    checkboxText: ''
  };
  @Input() fileBtnConfig: IImagesToFill = {
    type: '',
    imageNumber: []
  };
  @Input() addBackgroundBtnConfig: IImagesToFill = {
    type: '',
    imageNumber: []
  };
  @Input() addStampBtnConfig: IImagesToFill = {
    type: '',
    imageNumber: []
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
  @Output() scrollToStep2: EventEmitter<any> = new EventEmitter<any>();

  constructor( private _filesListService: FilesListService,
               private _storeService: StoreService,
               private _router: Router) {}

  calculateTotalPrice(): void {
    const totalLists = this.form.get('totalLists')?.value;
    if ( !Number.isNaN(totalLists) && totalLists !== '' ) {
      this.totalLists = totalLists;
      this.totalPrice = this.costPerPage * totalLists;
    }
  }

  cancelEdit(): void {
    this.hideEdit();
    this._filesListService.removeLastFile();
    this.updateFileList();
    this.scrollToStep2.emit();
  }

  changeRatio(e: any) {
    const imageProps: IImagesProperties = {
      resolution: {
        width: e.resolution.width,
        height: e.resolution.height
      },
      size: {
        width: e.size.width,
        height: e.size.height
      }
    };
    this.cropperConfig = {
      ...this.cropperConfig,
      image: imageProps
    };
    this._formatWrap.updateData(imageProps);
    this._cropper.updateData();
    this._imagePreview.rotatePreview(imageProps);
  }

  deleteFile(i: number): void {
    this._filesListService.deleteItem(i);
    this.files = this._filesListService.getFilesList();
    this._storeService.deleteImageFromOrder(i);
    if (this._currentFileInFileList === i) {
      this.hideEdit();
    }
    this.canShowSubmitBtn = this.fullnessCheck();
  }

  fullnessCheck(): boolean {
    if (this.constructorConfig.background) {
      // need image for background
      if (!this._storeServiceOrder.images.background.src) {
        return false;
      }
    }
    if (this.constructorConfig.totalStamps) {
      // need image for stamp
      if (this._storeServiceOrder.images.front.length < this.constructorConfig.totalStamps) {
        // incomplete array of images
        return false;
      } else {
        for (let i = 0; i < this._storeServiceOrder.images.front.length; i++) {
          // is there an empty cell in the array
          if ( !this._storeServiceOrder.images.front[i] ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  getFileData(e: any) {
    this._filesListService.addNewFile(e.fileName);
    this.updateFileList();
    this.imageSrc = e.imageSrc;
    this._currentFileInFileList = this.files[this.files.length - 1].index;
    this.cropperConfig = {
      fileIndex: this._filesListService.getLastIndex(),
      image: {
        resolution: {
          width: e.image.resolution.width,
          height: e.image.resolution.height
        },
        size: {
          width: e.image.size.width,
          height: e.image.size.height
        }
      },
      imageSrc: this.imageSrc,
      imagesToFill: {
        type: e.imagesToFill.type,
        imageNumber: e.imagesToFill.imageNumber.concat()
      }
    };
    this.imageProperties = {
      resolution: {
        width: e.image.resolution.width,
        height: e.image.resolution.height
      },
      size: {
        width: e.image.size.width,
        height: e.image.size.height
      }
    };
  }

  goToDeliveryClearancePage(): void {
    this._router.navigate(['/delivery-clearance']);
  }

  hideEdit() {
    this.imageSrc = '';
    this._currentFileInFileList = 0;
    this.cropperConfig = {
      fileIndex: 0,
      imageSrc: '',
      image: {
        resolution: {
          width: 0,
          height: 0
        },
        size: {
          width: '',
          height: ''
        }
      },
      imagesToFill: {
        type: '',
        imageNumber: []
      }
    };
    this._storeService.currentSelect.next('');
  }

  initForm(): void {
    this.form = new FormGroup({
      totalLists: new FormControl('1', [
        Validators.min(1),
        Validators.pattern('^[0-9]+$'),
        Validators.required
      ] ),
      confirmation: new FormControl(false, [
        Validators.requiredTrue
      ])
    });
  }

  ngOnDestroy(): void {
    this._storeServiceSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this._filesListService.clearFilesList();
    this.updateFileList();
    this.initForm();
    this.costPerPage = this.constructorConfig.costPerPage;
    this.calculateTotalPrice();
    this._storeServiceSubscriber = this._storeService.order.subscribe( value => {
      this._storeServiceOrder = value;
    } );
  }

  onContinue() {
    this._cropper.onContinue();
    this.scrollToStep2.emit();
    this.canShowSubmitBtn = this.fullnessCheck();
  }

  onScrollToCropper(): void {
    this.scroll( this._cropperWrap.nativeElement );
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView({behavior: 'smooth'});
  }

  submit(e: any) {
    // console.log('is submit ', e);
    // const formData = {...this.form.value};
    // console.log('formData ', formData);
    if (this.form.valid) {
      this._storeService.order.next({
        ...this._storeServiceOrder,
        totalCost: this.totalPrice,
        totalPages: this.totalLists
      });
      this.goToDeliveryClearancePage();
    }
  }

  totalListsChange(): void {
    this.calculateTotalPrice();
  }

  updateFileList(): void {
    this.files = this._filesListService.getFilesList();
  }

}
