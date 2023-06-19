import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent implements OnInit, OnDestroy {

  public year = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {}

}
