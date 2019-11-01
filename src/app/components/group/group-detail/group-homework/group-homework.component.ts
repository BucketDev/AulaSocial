import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { HomeworkService } from 'src/app/providers/group/homework.service';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';

import { Homework } from 'src/app/models/homework.interface';
import { HomeworkModalComponent } from './homework-modal/homework-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupService } from 'src/app/providers/group/group.service';
import { MatDialog } from '@angular/material/dialog';
import { HomeworkDialogComponent } from './homework-dialog/homework-dialog.component';
import { HomeworkDetailModalComponent } from './homework-detail-modal/homework-detail-modal.component';

@Component({
  selector: 'app-group-homework',
  templateUrl: './group-homework.component.html',
  styleUrls: ['./group-homework.component.css']
})
export class GroupHomeworkComponent implements OnInit, OnDestroy {

  homeworks: Homework[];
  loading: boolean = true;
  homeworkSub: Subscription;

  constructor(private homeworkService: HomeworkService,
              public fireAuth: FireAuthService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar,
              public groupService: GroupService,
              private dialog: MatDialog) {
  }
  
  ngOnInit() {
    this.homeworkSub = this.homeworkService.findAll(this.groupService.groupId)
      .subscribe((homeworks: Homework[]) => {
        this.loading = false;
        this.homeworks = homeworks
      });
  }

  ngOnDestroy() {
    this.homeworkSub.unsubscribe();
  }

  showAddHomework = () => {
    let ref = this.bottomSheet.open(HomeworkModalComponent);
    ref.afterDismissed().subscribe((data: any) => {
      if (data)
        this.snackBar.open(`La tarea ${data} ha sido creada`, '', {
          duration: 3000
        });
    });
  }

  showFiles = (homework: Homework) => {
    this.bottomSheet.open(HomeworkDetailModalComponent, { data: { homework }});
  }

  showHomework = (homework: Homework) => {
    let ref = this.dialog.open(HomeworkDialogComponent, {
      data: {homework}
    });
    ref.afterClosed().subscribe((data: any) => {
      if (data)
        this.snackBar.open(`La tarea ${data} ha sido creada`, '', {
          duration: 3000
        });
    });
  }

}
