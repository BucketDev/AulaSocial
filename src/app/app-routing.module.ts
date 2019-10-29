import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './providers/auth/auth-guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [AuthGuardService], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: 'dashboard' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
