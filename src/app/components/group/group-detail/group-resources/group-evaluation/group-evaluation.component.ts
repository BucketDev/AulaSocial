import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { EvaluationService } from 'src/app/providers/group/evaluation.service';
import { GroupService } from 'src/app/providers/group/group.service';

import { Evaluation } from 'src/app/models/evaluation.interface';
import { EvaluationModalComponent } from './evaluation-modal/evaluation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EvaluationResolveModalComponent } from './evaluation-resolve-modal/evaluation-resolve-modal.component';
import { EvaluationResultModalComponent } from './evaluation-result-modal/evaluation-result-modal.component';
import { User } from 'src/app/models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-evaluation',
  templateUrl: './group-evaluation.component.html',
  styleUrls: ['./group-evaluation.component.css']
})
export class GroupEvaluationComponent implements OnInit, OnDestroy {

  evaluations: Evaluation[];
  loading: boolean = true;
  evaluationSub: Subscription;

  constructor(public fireAuth: FireAuthService,
              private evaluationService: EvaluationService,
              private groupService: GroupService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.evaluationSub = this.evaluationService.findAllByGroupId(this.groupService.groupId)
      .subscribe((evaluations: Evaluation[]) => {
        this.evaluations = evaluations;
        evaluations.map((evaluation: Evaluation) => {
          this.evaluationService.findUsers(this.groupService.groupId, evaluation.uid)
            .subscribe((users: User[]) => {
              evaluation.completed = users.find((user: User) => user.uid === this.fireAuth.user.uid) ? true : false;
            });
          })
        this.loading = false;
      })
  }

  ngOnDestroy() {
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
    if (!evaluation.completed) {
      const ref = this.bottomSheet.open(EvaluationResolveModalComponent, {
        data: { evaluation }
      });
      ref.afterDismissed().subscribe((data: any) => {
        if (data)
          this.snackBar.open(`La evaluacion ${evaluation.title} ha sido almacenada`, '', {
            duration: 3000
          });
      });
    }
  }

  showResults = (evaluation: Evaluation) => {
    this.bottomSheet.open(EvaluationResultModalComponent, {
      data: { evaluation }
    })
  }

}
