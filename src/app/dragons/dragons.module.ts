import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { DragonsComponent } from './dragons.component';
import { DragonStartComponent } from './dragons-start.component';
import { DragonListComponent } from './dragon-list/dragon-list.component';
import { DragonFormComponent } from './dragon-form/dragon-form.component';
import { DragonDetailComponent } from './dragon-detail/dragon-detail.component';

import { DragonsRouting } from './dragons.routing';

import { DragonsService } from './dragons.service';
import { DragonListItemComponent } from './dragon-list-item/dragon-list-item.component';
import { DragonFormGuard } from './dragon-form/dragon-form.guard';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      HttpModule,
      DragonsRouting,
    ],
    declarations: [
      DragonsComponent,
      DragonStartComponent,
      DragonListComponent,
      DragonFormComponent,
      DragonDetailComponent,
      DragonListItemComponent,
    ],
    providers: [ DragonsService, DragonFormGuard ]
})
export class DragonsModule {}
