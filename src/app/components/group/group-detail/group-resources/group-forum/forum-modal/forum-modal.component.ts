import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForumService } from 'src/app/providers/group/forum.service';
import { GroupService } from 'src/app/providers/group/group.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-forum-modal',
  templateUrl: './forum-modal.component.html',
  styleUrls: ['./forum-modal.component.css']
})
export class ForumModalComponent implements OnInit {

  formForum: FormGroup
  loading: boolean = false;

  constructor(private groupService: GroupService,
              private forumService: ForumService,
              private bottomSheetRef: MatBottomSheetRef) {
    this.formForum = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl()
    })
  }

  ngOnInit() {
  }

  saveForum = () => {
    this.loading = true;
    let description = this.formForum.value.description;
    description = description ? description.replace(/\r\n|\r|\n/g,"<br>") : ''; 
    this.forumService.save(this.groupService.groupId, {...this.formForum.value}).then(() => {
      this.loading = false;
      this.bottomSheetRef.dismiss(this.formForum.value.title);
    });    
  }

}
