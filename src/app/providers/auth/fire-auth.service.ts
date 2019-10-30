import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User as FirebaseUser, auth } from 'firebase/app';
import { ReplaySubject } from 'rxjs';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.interface';
declare var gapi;

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  
  user: User;
  $userRetrieved = new ReplaySubject<boolean>(1);
  isNewUser: boolean = false;

  constructor(private angularFireAuth: AngularFireAuth,
              private userService: UserService,
              private router: Router) {
    this.angularFireAuth.authState.subscribe((user: FirebaseUser) => {
      if (user) {
        user.getIdTokenResult().then((idToken: auth.IdTokenResult) => {
          //console.log(user, idToken.claims);
          let {uid, displayName, email, photoURL} = user;
          this.session = {uid, displayName, email, photoURL, professor: idToken.claims.professor, admin: idToken.claims.admin}
          if (this.router.url.startsWith('/login')) {
            this.router.navigate(['/dashboard']);
          }
        })
      } else {
        this.session = null;
        let route = this.router.url.startsWith('/login') ? this.router.url : '/login';
        this.router.navigate([route]);
      }
    });
         
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: environment.drive.apiKey,
        clientId: environment.drive.clientId,
        discoveryDocs: environment.drive.discoveryDocs,
        scope: environment.drive.scopes.join(' ')
      })
    });
  }

  set session(user: User) {
    this.user = user;
    this.$userRetrieved.next(!!user);
  }

  get role() {
    if(this.user.admin)
      return 'Administrador';
    if(this.user.professor)
      return 'Profesor';
    else
      return 'Estudiante'
  }

  googleSignIn = async () => {
    const googleAuth = gapi.auth2.getAuthInstance()
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    const credential = auth.GoogleAuthProvider.credential(token);
    await this.angularFireAuth.auth.signInWithCredential(credential)
      .then((userCredential: auth.UserCredential) => { 
        if (userCredential.additionalUserInfo.isNewUser) {
          let {uid, displayName, photoURL, email} = userCredential.user;
          this.userService.save({uid, displayName, email, photoURL})
            .then(() => {
              this.session = {uid, displayName, email, photoURL};
              if (this.router.url.startsWith('/login')) {
                this.router.navigate(['/dashboard']);
              }
          });
        }
      });
  }

  signOut = () => {
    this.angularFireAuth.auth.signOut();
  }

}
