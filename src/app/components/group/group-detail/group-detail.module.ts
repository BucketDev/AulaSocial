import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../material/angular-material.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { SharedModule } from '../../shared/shared.module';
import { GroupHomeworkModule } from './group-homework/group-homework.module';
import { GroupEvaluationModule } from './group-evaluation/group-evaluation.module';

import { GroupDetailComponent } from './group-detail.component';
import { GroupForumModule } from './group-forum/group-forum.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedPipeModule,
    SharedModule,
    GroupHomeworkModule,
    GroupEvaluationModule,
    GroupForumModule
  ],
  declarations: [
    GroupDetailComponent
  ],
  exports: [
    GroupDetailComponent
  ]
})
export class GroupDetailModule { }
