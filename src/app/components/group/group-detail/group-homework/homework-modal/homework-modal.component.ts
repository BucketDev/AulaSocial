import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeworkService } from 'src/app/providers/group/homework.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { GroupService } from 'src/app/providers/group/group.service';


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
      this.loading = false;
      this.bottomSheetRef.dismiss(this.formHomework.value.title);
    })
  }

}
