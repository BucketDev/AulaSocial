import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireAuthService } from './providers/auth/fire-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'AulaSocial';
  loading: boolean = true;
  showNavbar: boolean = true;

  public constructor(private fireAuth: FireAuthService) {
    this.fireAuth.$userRetrieved.subscribe((value: boolean) =>{
      this.showNavbar = value;
      this.loading = false;
    });
  }

}
