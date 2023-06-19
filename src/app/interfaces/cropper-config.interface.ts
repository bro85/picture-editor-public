import { IImagesToFill } from './images-to-fill.interface';

export interface ICropperConfig {
  fileIndex: number;
  image: {
    resolution: {
      width: number;
      height: number;
    };
    size: {
      width: string;
      height: string;
    };
  };
  imageSrc: string;
  imagesToFill: IImagesToFill;
}
