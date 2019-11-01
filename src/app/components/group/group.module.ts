import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTreeModule } from '@angular/material/tree';

import { SharedModule } from '../shared/shared.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { AngularMaterialModule } from '../material/angular-material.module';
import { GroupDetailModule } from './group-detail/group-detail.module';

import { GroupModalComponent } from './group-modal/group-modal.component';
import { GroupHomeComponent } from './group-home/group-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatTreeModule,
    AngularMaterialModule,
    SharedModule,
    SharedPipeModule,
    GroupDetailModule
  ],
  declarations: [
    GroupModalComponent,
    GroupHomeComponent
  ],
  exports: [
    GroupHomeComponent
  ],
  entryComponents: [
    GroupModalComponent
  ]
})

export class GroupModule { }
