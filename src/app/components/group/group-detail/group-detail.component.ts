import { Component } from '@angular/core';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/providers/group/group.service';
declare var gapi;

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent {

  constructor(private activatedRoute: ActivatedRoute,
              public groupService: GroupService) {
    this.activatedRoute.params.subscribe(params => {
      this.groupService.groupId = params['uid'];
    });
  }

}
