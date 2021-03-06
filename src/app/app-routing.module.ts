import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './providers/auth/auth-guard.service';
import { AdminGuardService } from './providers/auth/admin-guard.service';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';

import { GROUP_ROUTES } from "./components/group/group.routes";
import { ADMIN_ROUTES } from './components/admin/admin.routes';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [AuthGuardService], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuardService], children: ADMIN_ROUTES},
    { path: 'group', children: GROUP_ROUTES },
    { path: '**', redirectTo: 'dashboard' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
