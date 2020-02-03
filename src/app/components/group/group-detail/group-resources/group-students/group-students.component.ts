import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Student} from '../../../../../models/student.interface';
import {StudentsModalComponent} from './students-modal/students-modal.component';
import {FireAuthService} from '../../../../../providers/auth/fire-auth.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {GroupService} from '../../../../../providers/group/group.service';

@Component({
  selector: 'app-group-students',
  templateUrl: './group-students.component.html',
  styleUrls: ['./group-students.component.css']
})
export class GroupStudentsComponent {

  constructor(public fireAuth: FireAuthService,
              private bottomSheet: MatBottomSheet,
              public groupService: GroupService) {

  }

  showRegisterAssistance = () => {
    this.bottomSheet.open(StudentsModalComponent);
  }

}
