import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GroupService } from "../../../providers/group/group.service";
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { UserService } from 'src/app/providers/user/user.service';
import { Group } from 'src/app/models/group.interface';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.css']
})
export class GroupModalComponent implements OnInit {

  formGroup: FormGroup;
  loading: boolean = false;

  constructor(private groupService: GroupService,
              private userService: UserService,
              private bottomSheetRef: MatBottomSheetRef<GroupModalComponent>) {
    this.formGroup = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl()
    });
  }

  ngOnInit() {
  }

  saveGroup = () => {
    this.loading = true
    let description = this.formGroup.value.description;
    description = description ? description.replace(/\r\n|\r|\n/g,"<br>") : ''; 
    this.groupService.save({...this.formGroup.value, description}).then((group: DocumentReference) => {
      return group.get();
    }).then((snapshot: DocumentSnapshot<Group>) => {
      this.userService.addGroup({uid: snapshot.id, ...snapshot.data()});
    }).then(() => {
      this.loading = false;
      this.bottomSheetRef.dismiss(this.formGroup.value.title);
    })
  }

}
