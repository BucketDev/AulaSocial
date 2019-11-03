import { Component, OnInit, ChangeDetectorRef, Inject, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';

import { GroupService } from 'src/app/providers/group/group.service';
import { QuestionService } from 'src/app/providers/group/question.service';
import { EvaluationResultService } from 'src/app/providers/group/evaluation-result.service';

import { Evaluation } from 'src/app/models/evaluation.interface';
import { Question } from 'src/app/models/question.interface';
import { EvaluationResult } from 'src/app/models/evaluation-result.interface';

import { EvaluationResolvePanelComponent } from './evaluation-resolve-panel/evaluation-resolve-panel.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-evaluation-resolve-modal',
  templateUrl: './evaluation-resolve-modal.component.html',
  styleUrls: ['./evaluation-resolve-modal.component.css']
})
export class EvaluationResolveModalComponent implements OnInit, OnDestroy {

  questions: Question[];
  questionSub: Subscription;
  loading: boolean = true;
  @ViewChildren(EvaluationResolvePanelComponent) answerPanels: QueryList<EvaluationResolvePanelComponent>;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: { evaluation: Evaluation },
              private bottomSheetRef: MatBottomSheetRef<EvaluationResolvePanelComponent>,
              private groupService: GroupService,
              private questionService: QuestionService,
              private evaluationResultService: EvaluationResultService) { }
              
  ngOnInit() {
    this.questionSub = this.questionService.findAll(this.groupService.groupId, this.data.evaluation.uid)
      .subscribe((questions: Question[]) => {
        this.questions = questions
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.questionSub.unsubscribe();
  }

  saveEvaluation = () => {
    let evaluationResults: EvaluationResult[] = [];
    this.answerPanels.map((panel: EvaluationResolvePanelComponent) => {
      evaluationResults.push(panel.getEvaluationResult());
    })
    this.evaluationResultService.save(this.groupService.groupId, this.data.evaluation.uid, evaluationResults)
      .then(() => {
        this.bottomSheetRef.dismiss(evaluationResults);
      });
    
  }

}
