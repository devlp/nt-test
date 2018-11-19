import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { HomeComponent } from './shared/home.component';
import { NotFoundComponent } from './shared/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: 'dragons',
    loadChildren: 'app/dragons/dragons.module#DragonsModule',
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', component: HomeComponent,
    canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
