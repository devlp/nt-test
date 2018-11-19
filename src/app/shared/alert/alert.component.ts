import { Component, OnInit } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent {
  public messages: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessages().subscribe(messages => { this.messages = messages; });
  }

  removeAlert(index: number) {
    this.messages.splice(index,1);
  }
}