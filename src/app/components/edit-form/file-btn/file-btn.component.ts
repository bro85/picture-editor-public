import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { IImagesToFill } from '../../../interfaces/images-to-fill.interface';
import { IConstructorConfig } from '../../../interfaces/constructor-config.interface';
import { IImagesProperties } from '../../../interfaces/images-properties.interface';

@Component({
  selector: 'app-file-btn',
  templateUrl: './file-btn.component.html',
  styleUrls: ['./file-btn.component.scss']
})
export class FileBtnComponent {

  @Input() fileBtnText = '';
  @Output() imageData: EventEmitter<any> = new EventEmitter<any>();
  @Output() scrollToCropper: EventEmitter<any> = new EventEmitter<any>();
  @Input() fileBtnConfig: IImagesToFill = {
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

  constructor(
    private _storeService: StoreService
  ) {}

  getImageProperties(): IImagesProperties {
    if ( this.constructorConfig.type === 'stamps-6' ||
      this.constructorConfig.type === 'stamps-9' ||
      this.constructorConfig.type === 'stamps-28' ||
      this.constructorConfig.type === 'stamps-28-difference') {
      return {
        resolution: {
          width: this.constructorConfig.stamp!.resolution.width,
          height: this.constructorConfig.stamp!.resolution.height
        },
        size: {
          width: this.constructorConfig.stamp!.size.width,
          height: this.constructorConfig.stamp!.size.height
        }
      };
    } else {
      return {
        resolution: {
          width: this.constructorConfig.background!.resolution.width,
          height: this.constructorConfig.background!.resolution.height
        },
        size: {
          width: this.constructorConfig.background!.size.width,
          height: this.constructorConfig.background!.size.height
        }
      };
    }
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    const _self = this;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageProperties: IImagesProperties = _self.getImageProperties();

      // sending data of uploaded image to parent component
      _self.imageData.emit({
        fileName: file.name, // name of uploaded image
        image: {
          resolution: {
            width: imageProperties.resolution.width,
            height: imageProperties.resolution.height
          },
          size: {
            width: imageProperties.size.width,
            height: imageProperties.size.height
          }
        },
        imageSrc: reader.result, // image in base64 format
        imagesToFill: {
          type: _self.fileBtnConfig.type, // Where to insert the image. Front side or background.
          imageNumber: _self.fileBtnConfig.imageNumber.concat() // Number of images to fill
        }
      });
      _self.scrollToCropper.emit();
      _self._storeService.currentSelect.next('background');
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
