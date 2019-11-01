import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

import { HomeworkService } from 'src/app/providers/group/homework.service';
import { GroupService } from 'src/app/providers/group/group.service';
import { Homework } from 'src/app/models/homework.interface';
import { Reference } from '@angular/fire/storage/interfaces';
import { File } from 'src/app/models/file.interface';

@Component({
  selector: 'app-homework-detail-modal',
  templateUrl: './homework-detail-modal.component.html',
  styleUrls: ['./homework-detail-modal.component.css']
})
export class HomeworkDetailModalComponent implements OnInit {

  homeworkFiles: any[];
  files: File[] = [];
  loading: boolean = true;

  constructor(private homeworkService: HomeworkService,
              private groupService: GroupService,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: { homework: Homework }) {
  }
  
  async ngOnInit() {
    this.homeworkService.findAllFiles(this.groupService.groupId, this.data.homework.uid)
    .then(async (result: firebase.storage.ListResult) => {
      this.files = [];
      for(const item of result.items) {
        let file: File = {};
        file.name = item.name;
        await item.getMetadata()
          .then(metadata => {
            const {uid, photoURL, email} = metadata.customMetadata;
            const {contentType, timeCreated} = metadata;
            file = {...file, uid, photoURL, email, contentType, timeCreated, downloadURL: item.getDownloadURL()};
          })
        this.files.push(file);
      }
      this.loading = false;
      this.changeDetectorRef.markForCheck();
    })
  }

  downloadFile = (downloadURL: Promise<string>) => {
    downloadURL.then((url: string) => window.open(url, '_blank'))
  }

}
