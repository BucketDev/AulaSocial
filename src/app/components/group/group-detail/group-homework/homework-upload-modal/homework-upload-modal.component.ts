import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Homework } from 'src/app/models/homework.interface';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { GroupService } from 'src/app/providers/group/group.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-homework-upload-modal',
  templateUrl: './homework-upload-modal.component.html',
  styleUrls: ['./homework-upload-modal.component.css']
})
export class HomeworkUploadModalComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { homework: Homework },
              private bottomSheetRef: MatBottomSheetRef<HomeworkUploadModalComponent>,
              private changeDetectorRef: ChangeDetectorRef,
              public fireAuth: FireAuthService,
              public groupService: GroupService) { }

  ngOnInit() {
  }

  getPath = () => {
    return `groups/${this.groupService.groupId}/homework/${this.data.homework.uid}`
  }

  uploaded = (photoURL: string) => {
    this.changeDetectorRef.markForCheck();
    this.bottomSheetRef.dismiss(photoURL);
  }

}
