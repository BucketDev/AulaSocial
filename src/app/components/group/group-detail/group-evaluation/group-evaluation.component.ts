import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { EvaluationService } from 'src/app/providers/group/evaluation.service';
import { GroupService } from 'src/app/providers/group/group.service';

import { Evaluation } from 'src/app/models/evaluation.interface';
import { EvaluationModalComponent } from './evaluation-modal/evaluation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EvaluationResolveModalComponent } from './evaluation-resolve-modal/evaluation-resolve-modal.component';
import { EvaluationResultModalComponent } from './evaluation-result-modal/evaluation-result-modal.component';

@Component({
  selector: 'app-group-evaluation',
  templateUrl: './group-evaluation.component.html',
  styleUrls: ['./group-evaluation.component.css']
})
export class GroupEvaluationComponent implements OnInit, OnDestroy {

  evaluations: Evaluation[];
  evaluationSub: Subscription;
  loading: boolean = true;

  constructor(public fireAuth: FireAuthService,
              private evaluationService: EvaluationService,
              private groupService: GroupService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.evaluationSub = this.evaluationService.findAll(this.groupService.groupId)
      .subscribe((evaluations: Evaluation[]) => {
        this.evaluations = evaluations;
        this.loading = false;
      });
  }
  
  ngOnDestroy(): void {
    this.evaluationSub.unsubscribe();
  }

  showAddEvaluation = () => {
    let ref = this.bottomSheet.open(EvaluationModalComponent);
    ref.afterDismissed().subscribe((data: any) => {
      if (data)
        this.snackBar.open(`La evaluación ${data} ha sido creada`, '', {
          duration: 3000
        });
    });
  }

  showEvaluation = (evaluation: Evaluation) => {
    const ref = this.bottomSheet.open(EvaluationResolveModalComponent, {
      data: { evaluation }
    });
    ref.afterDismissed().subscribe((data: any) => {
      if (data)
        this.snackBar.open(`La evaluacion ha sido guardada`, '', {
          duration: 3000
        });
    });
  }

  showResults = (evaluation: Evaluation) => {
    this.bottomSheet.open(EvaluationResultModalComponent, {
      data: { evaluation }
    })
  }

}
