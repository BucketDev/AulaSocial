import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeworkService } from 'src/app/providers/group/homework.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { GroupService } from 'src/app/providers/group/group.service';
import { GapiService } from 'src/app/providers/shared/gapi.service';
import { Student } from 'src/app/models/student.interface';


@Component({
  selector: 'app-homework-modal',
  templateUrl: './homework-modal.component.html',
  styleUrls: ['./homework-modal.component.css']
})
export class HomeworkModalComponent implements OnInit {

  formHomework: FormGroup;
  loading: boolean = false;

  constructor(private homeworkService: HomeworkService,
              private bottomSheetRef: MatBottomSheetRef<HomeworkModalComponent>,
              private gapiService: GapiService,
              public groupService: GroupService) {
    this.formHomework = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl(),
      'dueDate': new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  saveHomework = () => {
    this.loading = true;
    let description = this.formHomework.value.description;
    description = description ? description.replace(/\r\n|\r|\n/g,"<br>") : ''; 
    let dueDate = this.formHomework.value['dueDate'].toDate();
    this.homeworkService.save(this.groupService.groupId, {...this.formHomework.value, dueDate}).then(() => {
      this.gapiService.createEvent({
        summary: `Tarea: ${this.formHomework.value['title']}`,
        location: `group/${this.groupService.groupId}`,
        attendees: this.groupService.getAttendees(),
        start: dueDate,
        end: this.formHomework.value['dueDate'].add(1, 'days').toDate()
      }).then(() => {
        this.loading = false;
        this.bottomSheetRef.dismiss(this.formHomework.value.title);
      });
    })
  }

}
