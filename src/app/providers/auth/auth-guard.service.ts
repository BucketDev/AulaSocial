import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

import { FireAuthService } from './fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: FireAuthService,
              private router: Router) { }

  canActivate() {
    return this.auth.$userRetrieved.pipe(map((logged => {
      if(!logged) {
        this.router.navigate(['/login']);
      }
      return logged;
    })))
  }
}
