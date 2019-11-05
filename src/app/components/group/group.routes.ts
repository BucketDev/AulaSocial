import { Routes } from '@angular/router';

import { GroupHomeComponent } from './group-home/group-home.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { ForumDetailComponent } from './group-detail/group-resources/group-forum/forum-detail/forum-detail.component';
import { GroupResourcesComponent } from './group-detail/group-resources/group-resources.component';

export const GROUP_ROUTES: Routes = [
  { path: '', component: GroupHomeComponent },
  { path: ':uid', component: GroupDetailComponent, children: [
    { path: '', component: GroupResourcesComponent },
    { path: 'forum/:uid', component: ForumDetailComponent }
  ] },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
