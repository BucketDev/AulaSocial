import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

import { AngularMaterialModule } from 'src/app/components/material/angular-material.module';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { GroupEvaluationComponent } from './group-evaluation.component';
import { EvaluationModalComponent } from './evaluation-modal/evaluation-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EvaluationResolveModalComponent } from './evaluation-resolve-modal/evaluation-resolve-modal.component';
import { EvaluationResolvePanelComponent } from './evaluation-resolve-modal/evaluation-resolve-panel/evaluation-resolve-panel.component';
import { EvaluationResultModalComponent } from './evaluation-result-modal/evaluation-result-modal.component';
import { EvaluationResultPanelComponent } from './evaluation-result-modal/evaluation-result-panel/evaluation-result-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedPipeModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AngularMaterialModule,
    MatStepperModule,
    MatExpansionModule,
    MatRadioModule
  ],
  declarations: [
    GroupEvaluationComponent,
    EvaluationModalComponent,
    EvaluationResolveModalComponent,
    EvaluationResolvePanelComponent,
    EvaluationResultModalComponent,
    EvaluationResultPanelComponent
  ],
  exports: [
    GroupEvaluationComponent
  ],
  entryComponents: [
    EvaluationModalComponent,
    EvaluationResolveModalComponent,
    EvaluationResultModalComponent
  ]
})
export class GroupEvaluationModule { }
