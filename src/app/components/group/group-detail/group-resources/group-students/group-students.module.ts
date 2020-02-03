import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentsModalComponent} from './students-modal/students-modal.component';
import {AngularMaterialModule} from '../../../../material/angular-material.module';
import {SharedModule} from '../../../../shared/shared.module';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { GroupStudentsComponent } from './group-students.component';
import {SharedPipeModule} from '../../../../../pipes/shared-pipe.module';
import { StudentsAssistanceComponent } from './students-assistance/students-assistance.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    MatCheckboxModule,
    FormsModule,
    SharedPipeModule,
    RouterModule
  ],
  declarations: [
    StudentsModalComponent,
    GroupStudentsComponent,
    StudentsAssistanceComponent
  ],
  exports: [
    GroupStudentsComponent,
    StudentsAssistanceComponent
  ],
  entryComponents: [
    StudentsModalComponent
  ]
})
export class GroupStudentsModule { }
