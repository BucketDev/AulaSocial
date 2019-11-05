import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupResourcesComponent } from './group-resources.component';
import { GroupHomeworkModule } from './group-homework/group-homework.module';
import { GroupEvaluationModule } from './group-evaluation/group-evaluation.module';
import { GroupForumModule } from './group-forum/group-forum.module';
import { AngularMaterialModule } from 'src/app/components/material/angular-material.module';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule,
    SharedPipeModule,
    GroupHomeworkModule,
    GroupEvaluationModule,
    GroupForumModule
  ],
  declarations: [
    GroupResourcesComponent,
    GroupChatComponent
  ],
  exports: [
    GroupResourcesComponent,
    GroupChatComponent
  ]
})
export class GroupResourcesModule { }
