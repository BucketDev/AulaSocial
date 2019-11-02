import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Homework } from 'src/app/models/homework.interface';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { GroupService } from 'src/app/providers/group/group.service';

@Component({
  selector: 'app-homework-dialog',
  templateUrl: './homework-dialog.component.html',
  styleUrls: ['./homework-dialog.component.css']
})
export class HomeworkDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { homework: Homework },
              public fireAuth: FireAuthService,
              public groupService: GroupService) { }

  ngOnInit() {
  }

  getPath = () => {
    return `groups/${this.groupService.groupId}/homework/${this.data.homework.uid}`
  }

}
