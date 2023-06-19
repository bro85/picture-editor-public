import { Injectable } from '@angular/core';
import { IFile } from '../interfaces/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FilesListService {

  private _filesList: IFile[] = [];

  constructor() {}

  // Set index for image in object of array of files names
  private _getImageIndex(): number {
    let index: number = 1;
    if (this._filesList.length > 0){
      index = this._setIndexInFilesArray(this._filesList.length + 1);
    }
    return index;
  }

  private _setIndexInFilesArray(index: number): number {
    for ( let i = 0; i < this._filesList.length; i++ ){
      if ( index === this._filesList[i].index ) {
        index = this._setIndexInFilesArray(index + 1);
        break;
      }
    }
    return index;
  }

  public addNewFile(fileName: string): void {
    this._filesList[this._filesList.length] = {
      'index': this._getImageIndex(),
      'name': fileName
    };
  }

  public clearFilesList(): void {
    this._filesList = [];
  }

  public deleteItem(i: number): void {
    let newArr: IFile[] = [];
    this._filesList.forEach( item => {
      if (item.index !== i){
        newArr.push(item);
      }
    } );
    this._filesList = newArr.concat();
  }

  public getFilesList(): IFile[] {
    return this._filesList.concat();
  }

  public getLastIndex(): number {
    return this._filesList[this._filesList.length-1].index;
  }

  public removeLastFile(): void {
    this._filesList.pop();
  }

}
