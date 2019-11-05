import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { GroupService } from 'src/app/providers/group/group.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Evaluation } from 'src/app/models/evaluation.interface';
import { User } from 'src/app/models/user.interface';
import { Subscription } from 'rxjs';
import { EvaluationResultService } from 'src/app/providers/group/evaluation-result.service';

@Component({
  selector: 'app-evaluation-result-modal',
  templateUrl: './evaluation-result-modal.component.html',
  styleUrls: ['./evaluation-result-modal.component.css']
})
export class EvaluationResultModalComponent implements OnInit {

  loading: boolean = true;
  users: User[];
  userSub: Subscription;

  constructor(private groupService: GroupService,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: { evaluation: Evaluation },
              private evaluationResultService: EvaluationResultService) {
    this.userSub = this.evaluationResultService.findAllUsers(this.groupService.groupId, data.evaluation.uid)
      .subscribe((users: User[]) => {
        this.users = users;
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnInit() {
  }

}
