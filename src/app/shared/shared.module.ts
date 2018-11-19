import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { AlertComponent } from './alert/alert.component';

import { AlertService } from './alert/alert.service';
import { PageService } from './page.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
    declarations: [
      HeaderComponent,
      HomeComponent,
      NotFoundComponent,
      AlertComponent
    ],
    exports: [
      HeaderComponent,
      HomeComponent,
      NotFoundComponent,
      AlertComponent
    ],
    providers: [
      AlertService, PageService
    ]
})
export class SharedModule {}
