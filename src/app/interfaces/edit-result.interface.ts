import { IImagesToFill } from './images-to-fill.interface';

export interface IEditResult {
  fileIndex: number;
  imageSrc: string;
  imagesToFill: IImagesToFill;
}
