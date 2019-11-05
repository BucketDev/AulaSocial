import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ForumModalComponent } from './forum-modal/forum-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ForumService } from 'src/app/providers/group/forum.service';
import { GroupService } from 'src/app/providers/group/group.service';
import { Forum } from 'src/app/models/forum.interface';

@Component({
  selector: 'app-group-forum',
  templateUrl: './group-forum.component.html',
  styleUrls: ['./group-forum.component.css']
})
export class GroupForumComponent implements OnInit, OnDestroy {

  forums: Forum[];
  loading: boolean = true;
  forumSub: Subscription;

  constructor(public fireAuth: FireAuthService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar,
              private groupService: GroupService,
              private forumService: ForumService) { }

  ngOnInit() {
    this.forumSub = this.forumService.findAll(this.groupService.groupId)
      .subscribe((forums: Forum[]) => {
        this.forums = forums;
        this.loading = false;
      })
  }

  ngOnDestroy() {
    this.forumSub.unsubscribe();
  }

  showAddForum = () => {
    let ref = this.bottomSheet.open(ForumModalComponent);
    ref.afterDismissed().subscribe((data: any) => {
      if (data)
        this.snackBar.open('El foro ha sido creado', '', {
          duration: 300
        });
    });
  }

}
