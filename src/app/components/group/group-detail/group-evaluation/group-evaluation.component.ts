import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { Evaluation } from 'src/app/models/evaluation.interface';
import { EvaluationService } from 'src/app/providers/group/evaluation.service';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/providers/group/group.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-group-evaluation',
  templateUrl: './group-evaluation.component.html',
  styleUrls: ['./group-evaluation.component.css']
})
export class GroupEvaluationComponent implements OnInit {

  evaluations: Evaluation[];
  evaluationSub: Subscription;
  loading: boolean = true;

  constructor(public fireAuth: FireAuthService,
              private evaluationService: EvaluationService,
              private groupService: GroupService,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.evaluationSub = this.evaluationService.findAll(this.groupService.groupId)
      .subscribe((evaluations: Evaluation[]) => {
        this.evaluations = evaluations;
        this.loading = false;
      });
  }

  /*showAddHomework = () => {
    let ref = this.bottomSheet.open(HomeworkModalComponent);
    ref.afterDismissed().subscribe((data: any) => {
      if (data)
        this.snackBar.open(`La tarea ${data} ha sido creada`, '', {
          duration: 3000
        });
    });
  }*/

}
