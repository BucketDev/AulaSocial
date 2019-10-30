import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public fireAuth: FireAuthService) { }

  ngOnInit() {
  }

  logOut = () => this.fireAuth.signOut();

}
