import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../material/angular-material.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { SharedModule } from '../../shared/shared.module';

import { GroupDetailComponent } from './group-detail.component';
import { RouterModule } from '@angular/router';
import { GroupResourcesModule } from './group-resources/group-resources.module';
import {GroupStudentsModule} from './group-resources/group-students/group-students.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    SharedPipeModule,
    SharedModule,
    GroupResourcesModule,
    GroupStudentsModule
  ],
  declarations: [
    GroupDetailComponent
  ],
  exports: [
    GroupDetailComponent
  ]
})
export class GroupDetailModule { }
