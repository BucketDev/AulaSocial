import {Component, Inject, OnInit} from '@angular/core';
import {GroupService} from '../../../../../../providers/group/group.service';
import {Student} from '../../../../../../models/student.interface';
import {MatBottomSheetRef, MatCheckboxChange, MatSnackBar} from '@angular/material';
import {AssistanceService} from '../../../../../../providers/group/assistance.service';
import {Assistance} from '../../../../../../models/assistance.interface';
import {Moment} from 'moment';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-students',
  templateUrl: './students-modal.component.html',
  styleUrls: ['./students-modal.component.css']
})
export class StudentsModalComponent implements OnInit {
  selectedStudents: Student[] = [];
  assistanceDate: Moment;

  constructor(public groupService: GroupService,
              private assistanceService: AssistanceService,
              private snackBar: MatSnackBar,
              private bottomSheetRef: MatBottomSheetRef) { }

  ngOnInit() { }

  selectStudent = (event: MatCheckboxChange, student: Student) => {
    if (event.checked) {
      this.selectedStudents.push(student);
    } else {
      this.selectedStudents = this.selectedStudents.filter((storedStudent: Student) => storedStudent.uid !== student.uid);
    }
  }

  saveAssistance = () => {
    const assistance: Assistance = {
      uid: this.assistanceDate.format('YYYYMMDD'),
      date: this.assistanceDate.toDate(),
      students: this.selectedStudents,
      creationDate: new Date()
    };
    this.assistanceService.saveAssistance(this.groupService.groupId, assistance)
      .then(() => {
        this.bottomSheetRef.dismiss();
        this.snackBar.open(`La asistencia para el dia ${this.assistanceDate.format('LL')} ha sido guardada`, '', {
          duration: 3000
        });
      });
  }

}
