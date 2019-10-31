import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GroupModalComponent } from '../group-modal/group-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Group } from 'src/app/models/group.interface';
import { GroupService } from 'src/app/providers/group/group.service';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.css']
})
export class GroupHomeComponent implements OnDestroy {

  originalGroups: Group[];
  groups: Group[];
  groupsSub: Subscription;
  loading: boolean = true;
  title: string;

  constructor(private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar,
              private groupService: GroupService,
              public fireAuth: FireAuthService) {
    this.groupsSub = this.groupService.findAll().subscribe((groups: Group[]) => {
      this.originalGroups = groups;
      this.groups = [...this.originalGroups];
      this.loading = false;
    });
  }

  searchGroups = () => {
    if (this.title.length > 0) {
      this.groups = this.originalGroups.filter((group: Group) => group.title.toLowerCase().includes(this.title.toLowerCase()))
    } else
      this.groups = [...this.originalGroups];
    
  }

  ngOnDestroy() {
    this.groupsSub.unsubscribe();
  }

  showGroupModal = () => {
    let ref = this.bottomSheet.open(GroupModalComponent);
    ref.afterDismissed().subscribe((data: any) => {
      this.snackBar.open(`El grupo ${data} ha sido agregado`, '', {
        duration: 3000
      });
    });
  }

  viewGroup = (uid: string) => {
    console.log(uid);
  }

}
