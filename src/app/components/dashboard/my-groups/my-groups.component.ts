import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { Group } from 'src/app/models/group.interface';
import { UserService } from 'src/app/providers/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css']
})
export class MyGroupsComponent implements OnInit, OnDestroy {

  groups: Group[] = [];
  groupsSub: Subscription;
  loading: boolean = true;

  constructor(public fireAuth: FireAuthService,
              private userService: UserService) {
    this.groupsSub = this.userService.findGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.groupsSub.unsubscribe();
  }

  ngOnInit() {
  }

}
