import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { FilesListService } from '../../services/files-list.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private _storeService: StoreService,
              private _filesListService: FilesListService) {}

  ngOnInit(): void {
    this._storeService.resetOrder();
    this._filesListService.clearFilesList();
    this._storeService.currentSelect.next('');
  }

}
