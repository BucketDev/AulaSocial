import { Component, OnInit } from '@angular/core';
import {GroupService} from '../../../../../../providers/group/group.service';
import {AssistanceService} from '../../../../../../providers/group/assistance.service';
import {Assistance} from '../../../../../../models/assistance.interface';
import {Observable, Subscription} from 'rxjs';
import {Student} from '../../../../../../models/student.interface';

@Component({
  selector: 'app-students-assistance',
  templateUrl: './students-assistance.component.html',
  styleUrls: ['./students-assistance.component.css']
})
export class StudentsAssistanceComponent implements OnInit {

  loading = true;
  assists: Assistance[];

  constructor(public groupService: GroupService,
              private assistanceService: AssistanceService) {
    assistanceService.findByUid(groupService.groupId).subscribe((assists: Assistance[]) => {
      this.assists = assists;
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  hasAssistance = (student: Student, students: Student[]) =>
    !!students.find((assistantStudent: Student) => assistantStudent.uid === student.uid)

}
