import { Component, OnInit, Input } from '@angular/core';

import { Dragon } from '../dragon';

@Component({
  selector: 'app-dragon-list-item',
  templateUrl: './dragon-list-item.component.html',
  styleUrls: ['./dragon-list-item.component.scss']
})
export class DragonListItemComponent implements OnInit {

  @Input() dragon: Dragon;

  constructor() { }

  ngOnInit() {
  }

}
