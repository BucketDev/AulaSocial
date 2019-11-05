import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

import { AngularMaterialModule } from 'src/app/components/material/angular-material.module';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';

import { GroupForumComponent } from './group-forum.component';
import { ForumModalComponent } from './forum-modal/forum-modal.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,
    SharedPipeModule,
    MatBadgeModule
  ],
  declarations: [
    GroupForumComponent,
    ForumModalComponent,
    ForumDetailComponent
  ],
  exports: [
    GroupForumComponent
  ],
  entryComponents: [
    ForumModalComponent
  ]
})
export class GroupForumModule { }
