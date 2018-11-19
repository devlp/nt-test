import { Routes, RouterModule } from '@angular/router';

import { DragonsComponent } from './dragons.component';
import { DragonStartComponent } from './dragons-start.component';
import { DragonFormComponent } from './dragon-form/dragon-form.component';
import { DragonDetailComponent } from './dragon-detail/dragon-detail.component';
import { DragonFormGuard } from './dragon-form/dragon-form.guard';

const DRAGONS_ROUTES: Routes = [
  { path: '', component: DragonsComponent, children: [
      { path: '', component: DragonStartComponent },
      { path: 'new', component: DragonFormComponent ,
        canDeactivate: [DragonFormGuard]},
      { path: ':slug', component: DragonDetailComponent },
      { path: ':slug/edit', component: DragonFormComponent,
        canDeactivate: [DragonFormGuard]}
  ]}
];

export const DragonsRouting = RouterModule.forChild(DRAGONS_ROUTES);
