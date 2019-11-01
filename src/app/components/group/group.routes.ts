import { Routes } from '@angular/router';

import { GroupHomeComponent } from './group-home/group-home.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

export const GROUP_ROUTES: Routes = [
  { path: '', component: GroupHomeComponent },
  { path: ':uid', component: GroupDetailComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
