import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';

@Component({
  selector: 'app-group-forum',
  templateUrl: './group-forum.component.html',
  styleUrls: ['./group-forum.component.css']
})
export class GroupForumComponent implements OnInit {

  forums: any[] = [];
  loading: boolean;

  constructor(public fireAuth: FireAuthService) { }

  ngOnInit() {
  }

}
