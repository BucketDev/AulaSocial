import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AngularMaterialModule } from '../material/angular-material.module';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { RouterModule } from '@angular/router';
import { AdminGroupComponent } from './admin-group/admin-group.component';
import { AdminHomeworkComponent } from './admin-homework/admin-homework.component';
import { AdminEvaluationComponent } from './admin-evaluation/admin-evaluation.component';
import { AdminForumComponent } from './admin-forum/admin-forum.component';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SharedPipeModule,
    AngularMaterialModule,
    MatMenuModule
  ],
  declarations: [
    AdminComponent,
    AdminUserComponent,
    AdminGroupComponent,
    AdminHomeworkComponent,
    AdminEvaluationComponent,
    AdminForumComponent
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
