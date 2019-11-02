import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';

import { AngularMaterialModule } from 'src/app/components/material/angular-material.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { GroupEvaluationComponent } from './group-evaluation.component';
import { EvaluationModalComponent } from './evaluation-modal/evaluation-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedPipeModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    MatStepperModule
  ],
  declarations: [
    GroupEvaluationComponent,
    EvaluationModalComponent
  ],
  exports: [
    GroupEvaluationComponent
  ],
  entryComponents: [
    EvaluationModalComponent
  ]
})
export class GroupEvaluationModule { }
