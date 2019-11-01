import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { AngularMaterialModule } from 'src/app/components/material/angular-material.module';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { GroupHomeworkComponent } from './group-homework.component';
import { GroupModalComponent } from '../../group-modal/group-modal.component';
import { HomeworkModalComponent } from './homework-modal/homework-modal.component';
import { HomeworkDialogComponent } from './homework-dialog/homework-dialog.component';
import { HomeworkDetailModalComponent } from './homework-detail-modal/homework-detail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedPipeModule,
    AngularMaterialModule,
    SharedModule,
    MatListModule
  ],
  declarations: [
    GroupHomeworkComponent,
    HomeworkModalComponent,
    HomeworkDialogComponent,
    HomeworkDetailModalComponent
  ],
  exports: [
    GroupHomeworkComponent
  ],
  providers: [
    GroupModalComponent
  ],
  entryComponents: [
    HomeworkModalComponent,
    HomeworkDialogComponent,
    HomeworkDetailModalComponent
  ]
})
export class GroupHomeworkModule { }
