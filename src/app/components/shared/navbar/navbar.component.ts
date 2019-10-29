import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private fireAuth: FireAuthService) { }

  ngOnInit() {
  }

  logOut = () => this.fireAuth.signOut();

}
