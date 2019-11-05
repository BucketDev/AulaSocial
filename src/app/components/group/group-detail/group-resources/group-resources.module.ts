import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupResourcesComponent } from './group-resources.component';
import { GroupHomeworkModule } from './group-homework/group-homework.module';
import { GroupEvaluationModule } from './group-evaluation/group-evaluation.module';
import { GroupForumModule } from './group-forum/group-forum.module';
import { AngularMaterialModule } from 'src/app/components/material/angular-material.module';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    SharedPipeModule,
    GroupHomeworkModule,
    GroupEvaluationModule,
    GroupForumModule
  ],
  declarations: [
    GroupResourcesComponent
  ],
  exports: [
    GroupResourcesComponent
  ]
})
export class GroupResourcesModule { }
