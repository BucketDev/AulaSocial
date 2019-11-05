import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from 'src/app/models/group.interface';
import { GroupService } from 'src/app/providers/group/group.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/providers/user/user.service';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  groups: Group[];
  groupSub: Subscription;

  constructor(private groupService: GroupService,
              private userService: UserService) {
    this.groupSub = groupService.findAll().subscribe((groups: Group[]) => {
      this.groups = groups;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.groupSub.unsubscribe();
  }

  ngOnInit() {
  }

  deleteGroup = (group: Group) => {
    this.loading = true
    this.groupService.delete(group.uid)
      .then(() => this.userService.removeGroupFromAllUsers(group.uid))
      .then(() => this.loading = false);
  }

}
