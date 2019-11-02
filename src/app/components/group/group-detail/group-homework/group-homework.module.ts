import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { AngularMaterialModule } from 'src/app/components/material/angular-material.module';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { GroupHomeworkComponent } from './group-homework.component';
import { GroupModalComponent } from '../../group-modal/group-modal.component';
import { HomeworkModalComponent } from './homework-modal/homework-modal.component';
import { HomeworkDialogComponent } from './homework-dialog/homework-dialog.component';
import { HomeworkFilesModalComponent } from './homework-files-modal/homework-files-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedPipeModule,
    AngularMaterialModule,
    SharedModule
  ],
  declarations: [
    GroupHomeworkComponent,
    HomeworkModalComponent,
    HomeworkDialogComponent,
    HomeworkFilesModalComponent
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
    HomeworkFilesModalComponent
  ]
})
export class GroupHomeworkModule { }
