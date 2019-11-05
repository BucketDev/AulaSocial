import { Routes } from '@angular/router';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminGroupComponent } from './admin-group/admin-group.component';
import { AdminHomeworkComponent } from './admin-homework/admin-homework.component';
import { AdminEvaluationComponent } from './admin-evaluation/admin-evaluation.component';
import { AdminForumComponent } from './admin-forum/admin-forum.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'users', component: AdminUserComponent },
  { path: 'groups', component: AdminGroupComponent },
  { path: 'homeworks', component: AdminHomeworkComponent },
  { path: 'evaluations', component: AdminEvaluationComponent },
  { path: 'forums', component: AdminForumComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'users' }
];
