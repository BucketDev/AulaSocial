import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fireAuth: FireAuthService) { }

  ngOnInit() {
  }

  signIn = () => this.fireAuth.googleSignIn();

}
