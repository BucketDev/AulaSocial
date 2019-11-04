import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupForumComponent } from './group-forum.component';
import { AngularMaterialModule } from 'src/app/components/material/angular-material.module';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    SharedPipeModule
  ],
  declarations: [GroupForumComponent],
  exports: [
    GroupForumComponent
  ]
})
export class GroupForumModule { }
