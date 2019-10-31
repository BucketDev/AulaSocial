import { Routes } from '@angular/router';

import { GroupHomeComponent } from './group-home/group-home.component';

export const GROUP_ROUTES: Routes = [
  { path: '', component: GroupHomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
