import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { EvaluationResultService } from 'src/app/providers/group/evaluation-result.service';
import { GroupService } from 'src/app/providers/group/group.service';
import { Subscription } from 'rxjs';
import { EvaluationResult } from 'src/app/models/evaluation-result.interface';
import { User } from 'src/app/models/user.interface';
import { Evaluation } from 'src/app/models/evaluation.interface';

@Component({
  selector: 'app-evaluation-result-panel',
  templateUrl: './evaluation-result-panel.component.html',
  styleUrls: ['./evaluation-result-panel.component.css']
})
export class EvaluationResultPanelComponent implements OnInit, OnDestroy {

  @Input() evaluation: Evaluation;
  @Input() user: User;
  results: EvaluationResult[];
  loading: boolean = false;
  resultSub: Subscription;

  constructor(private groupService: GroupService,
              private evaluationResultService: EvaluationResultService,
              private changeDetectorRef: ChangeDetectorRef) {
  }
  
  ngOnInit() {
  }
  ngOnDestroy(): void {
  }

  showResults = () => {
    this.loading = true;
    this.resultSub = this.evaluationResultService
      .findAll(this.groupService.groupId, this.evaluation.uid, this.user.uid)
      .subscribe((results: EvaluationResult[]) => {
        this.results = results;
        this.loading = false;
      });
  }

}
