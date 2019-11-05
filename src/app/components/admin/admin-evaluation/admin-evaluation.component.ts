import { Component } from '@angular/core';
import { Evaluation } from 'src/app/models/evaluation.interface';
import { GroupService } from 'src/app/providers/group/group.service';
import { EvaluationService } from 'src/app/providers/group/evaluation.service';
import { GapiService } from 'src/app/providers/shared/gapi.service';
import { Group } from 'src/app/models/group.interface';

@Component({
  selector: 'app-admin-evaluation',
  templateUrl: './admin-evaluation.component.html',
  styleUrls: ['./admin-evaluation.component.css']
})
export class AdminEvaluationComponent {

  loading: boolean = true;
  evaluations: Evaluation[];

  constructor(private groupService: GroupService,
              private evaluationService: EvaluationService,
              private gapiService: GapiService) {
    groupService.findAll().subscribe((groups: Group[]) => {
      this.evaluations = [];
      groups.forEach((group: Group) => {
        evaluationService.findAllAdminByGroupId(group.uid)
          .subscribe((evaluations: Evaluation[]) => this.evaluations = evaluations);
            this.loading = false;
          });
    });
  }

  deleteEvaluation = (evaluation: Evaluation) => {
    this.loading = true;
    this.evaluationService.delete(evaluation.groupId, evaluation.uid)
      .then(() => {
        this.evaluations = this.evaluations.filter((_evaluation: Evaluation) => evaluation.uid !== _evaluation.uid);
      })
      .then(() => this.gapiService.deleteEvent(evaluation.eventId))
      .then(() => this.loading = false);
  }

}
