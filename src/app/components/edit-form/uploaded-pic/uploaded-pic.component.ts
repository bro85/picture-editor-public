import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFile } from '../../../interfaces/file.interface';

@Component({
  selector: 'app-uploaded-pic',
  templateUrl: './uploaded-pic.component.html',
  styleUrls: ['./uploaded-pic.component.scss']
})
export class UploadedPicComponent implements OnInit {

  @Input() 'files': Array<IFile>;
  @Output() 'onDeleteFile': EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  deleteFile(i: number) {
    this.onDeleteFile.emit(i);
  }
}
