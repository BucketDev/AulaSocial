import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from 'src/app/providers/group/chat.service';
import { GroupService } from 'src/app/providers/group/group.service';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { Message } from 'src/app/models/message-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit, OnDestroy {
  
  loading: boolean = true;
  formChat: FormGroup;
  messages: Message[];
  messageSub: Subscription;
  @ViewChild("messagesContainer", { static: false }) messagesContainer: ElementRef;

  constructor(private chatService: ChatService,
              private groupService: GroupService,
              public fireAuth: FireAuthService) {
    this.formChat = new FormGroup({
      'message': new FormControl('', [
        Validators.required
      ])
    });
    this.messageSub = this.chatService.findAllByGroupId(groupService.groupId)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.loading = false;
        const element = document.querySelector('.aula-chat-container');
        setTimeout(() => element.scrollTop = element.scrollHeight, 20)
      })
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }

  saveReply = (formReplyRef) => {
    let message = this.formChat.value.message;
    message = message ? message.replace(/\r\n|\r|\n/g,"<br>") : ''; 
    this.chatService.save(this.groupService.groupId, message)
      .then(() => {
        formReplyRef.resetForm();
        this.formChat.reset();
      })
  }

  sameSender = (message: Message) =>
    message.userId === this.fireAuth.user.uid

}
