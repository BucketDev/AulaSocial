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
import { HomeworkUploadModalComponent } from './homework-upload-modal/homework-upload-modal.component';
import { HomeworkFilesModalComponent } from './homework-files-modal/homework-files-modal.component';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-group-homework',
  templateUrl: './group-homework.component.html',
  styleUrls: ['./group-homework.component.css']
})
export class GroupHomeworkComponent implements OnInit, OnDestroy {

  homeworks: Homework[];
  loading: boolean = true;

  constructor(private homeworkService: HomeworkService,
              public fireAuth: FireAuthService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar,
              public groupService: GroupService,
              private dialog: MatDialog) {
  }
  
  ngOnInit() {
    this.homeworkService.findAll(this.groupService.groupId)
      .toPromise().then((homeworks: Homework[]) => {
        this.homeworks = homeworks
        return homeworks;
      }).then(async (homeworks: Homework[]) => {
        return await homeworks.map((homework: Homework) => {
          this.homeworkService.findUsers(this.groupService.groupId, homework.uid)
            .subscribe((users: User[]) => {
              homework.completed = users.find((user: User) => user.uid === this.fireAuth.user.uid) ? true : false;
            });
        })
      }).then(() => {
        this.loading = false;
      });
  }

  ngOnDestroy() {}

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
    this.bottomSheet.open(HomeworkFilesModalComponent, { data: { homework }});
  }

  showHomework = (homework: Homework) => {
    if(!homework.completed) {
      let ref = this.bottomSheet.open(HomeworkUploadModalComponent, {
        data: { homework }
      });
      ref.afterDismissed().subscribe((data: any) => {
        if (data)
          this.snackBar.open(`La tarea ${homework.title} ha sido almacenada`, '', {
            duration: 3000
          });
      });
    }
  }

}
