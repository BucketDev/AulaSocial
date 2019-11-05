import { Component } from '@angular/core';
import { Forum } from 'src/app/models/forum.interface';
import { GroupService } from 'src/app/providers/group/group.service';
import { ForumService } from 'src/app/providers/group/forum.service';
import { Group } from 'src/app/models/group.interface';

@Component({
  selector: 'app-admin-forum',
  templateUrl: './admin-forum.component.html',
  styleUrls: ['./admin-forum.component.css']
})
export class AdminForumComponent {

  loading: boolean = true;
  forums: Forum[];

  constructor(private groupService: GroupService,
              private forumService: ForumService) {
    groupService.findAll().subscribe((groups: Group[]) => {
      this.forums = [];
      groups.forEach((group: Group) => {
        forumService.findAllAdminByGroupId(group.uid)
          .subscribe((forums: Forum[]) => this.forums = forums);
            this.loading = false;
          });
    });
  }

  deleteForum = (forum: Forum) => {
    this.loading = true;
    this.forumService.delete(forum.groupId, forum.uid)
      .then(() => {
        this.forums = this.forums.filter((_forum: Forum) => forum.uid !== _forum.uid);
        this.loading = false;
      });
  }

}
