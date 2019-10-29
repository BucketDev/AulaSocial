import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, auth } from 'firebase/app';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  
  $userRetrieved = new ReplaySubject<boolean>(1);

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) {
    this.angularFireAuth.authState.subscribe((user: User) => {
      console.log(user);
      
      if (user) {
        user.getIdTokenResult().then((idToken: auth.IdTokenResult) => {
          //console.log(user, idToken.claims);
          this.$userRetrieved.next(true);
          if (this.router.url.startsWith('/login')) {
            this.router.navigate(['/dashboard']);
          }
        })
      } else {
        this.$userRetrieved.next(false);
        let route = this.router.url.startsWith('/login') ? this.router.url : '/login';
        this.router.navigate([route]);
      }
    });
  }

  googleSignIn = () => {
    this.angularFireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  signOut = () => {
    this.angularFireAuth.auth.signOut();
  }

}
