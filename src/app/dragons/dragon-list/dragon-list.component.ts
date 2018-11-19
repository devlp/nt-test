import { Component, OnInit } from '@angular/core';

import { DragonsService } from '../dragons.service';
import { AlertService } from './../../shared/alert/alert.service';
import { PageService } from '../../shared/page.service';
import { Dragon } from '../dragon';

@Component({
  selector: 'app-dragon-list',
  templateUrl: './dragon-list.component.html',
  styleUrls: ['./dragon-list.component.scss']
})
export class DragonListComponent implements OnInit {

  dragons: Dragon[] = [];
  metadata: any;
  
  // page object
  page: any = {};

  constructor(private dragonsService: DragonsService, private pageService: PageService, private alertService: AlertService) { }

  ngOnInit() {
    this.list(0);
  }

  list(page: number) {
    this.dragonsService.getByPage(page)
      .subscribe((data:any) => {
        this.dragons = data.items;
        this.metadata = data._metadata;
        this.setPage(page);
        try {
          let fragment = document.querySelector('#dragList');
          if (fragment) {
            fragment.scrollIntoView();
          }
        } catch (e) { 
          this.alertService.error("Unexpected error, anchor.");
          console.error('Unexpected error: ', e);
        }
      }),(error) => {
        this.alertService.error("Unexpected error.");
        console.error('Unexpected error: ', error);
      }
  }

  setPage(page: number) {
    // get page object from service
    this.page = this.pageService.getPage(this.metadata.total_count, page);
  }

}
