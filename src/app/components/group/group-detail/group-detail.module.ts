import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../material/angular-material.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';

import { GroupDetailComponent } from './group-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { GroupHomeworkModule } from './group-homework/group-homework.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedPipeModule,
    SharedModule,
    GroupHomeworkModule
  ],
  declarations: [
    GroupDetailComponent
  ],
  exports: [
    GroupDetailComponent
  ]
})
export class GroupDetailModule { }
