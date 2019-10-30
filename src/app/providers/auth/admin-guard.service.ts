import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FireAuthService } from './fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  
  constructor(private fireAuth: FireAuthService,
              private router: Router) { }

  canActivate() {
    if (!this.fireAuth.user.admin)
      this.router.navigate(['/dashboard']);
    return this.fireAuth.user.admin;
  }

}
