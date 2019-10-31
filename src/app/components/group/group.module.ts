import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { AngularMaterialModule } from '../material/angular-material.module';

import { GroupModalComponent } from './group-modal/group-modal.component';
import { GroupHomeComponent } from './group-home/group-home.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    AngularMaterialModule,
    SharedModule,
    SharedPipeModule
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
