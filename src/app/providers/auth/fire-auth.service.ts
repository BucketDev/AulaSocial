import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) {
    this.angularFireAuth.authState.subscribe((user: User) => {
      if (user) {
        user.getIdTokenResult().then((idToken: auth.IdTokenResult) => {
          //console.log(user, idToken.claims);
          this.router.navigateByUrl('/dashboard');
        })
      }
    });
  }

  googleSignIn = () => {
    this.angularFireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

}
