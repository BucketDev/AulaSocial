import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from 'src/app/providers/group/group.service';
import { ForumService } from 'src/app/providers/group/forum.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Forum } from 'src/app/models/forum.interface';
import { Reply } from 'src/app/models/reply.interface';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplyService } from 'src/app/providers/group/reply.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  loadingReplies: boolean = true;
  forumSub: Subscription;
  repliesSub: Subscription;
  forum: Forum;
  replies: Reply[];
  formReply: FormGroup;

  constructor(public groupService: GroupService,
              private forumService: ForumService,
              private replyService: ReplyService,
              private activatedRoute: ActivatedRoute,
              public fireAuth: FireAuthService,
              private snackBar: MatSnackBar) {
    this.formReply = new FormGroup({
      'description': new FormControl('', [
        Validators.required
      ])
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.forumService.forumId = params['uid'];
      this.forumSub = forumService.findById(groupService.groupId, params['uid'])
        .subscribe((forum: Forum) => {
          this.forum = forum;
          this.loading = false;
          return forum
        });
      this.repliesSub = this.replyService.findAll(groupService.groupId, params['uid'])
        .subscribe((replies: Reply[]) =>{
          this.replies = replies;
          this.loadingReplies = false;
        });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.forumSub.unsubscribe();
    this.repliesSub.unsubscribe();
  }

  saveReply = (formReplyRef) => {
    let description = this.formReply.value.description;
    description = description ? description.replace(/\r\n|\r|\n/g,"<br>") : ''; 
    this.replyService.save(this.groupService.groupId, this.forumService.forumId, description)
      .then(() => {
        formReplyRef.resetForm();
        this.formReply.reset();
        this.snackBar.open('Tu respuesta ha sido almacenada', '', {
          duration: 3000
        })
      })
  }

  addClap = (reply: Reply) =>
    this.replyService.addClap(this.groupService.groupId, this.forumService.forumId, reply.uid, ++reply.claps);

}
