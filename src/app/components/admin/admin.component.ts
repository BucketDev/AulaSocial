import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { UserService } from 'src/app/providers/user/user.service';

import { User } from 'src/app/models/user.interface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  users: User[];
  loading: boolean = true;

  constructor(private userService: UserService,
              public fireAuth: FireAuthService,
              private functions: AngularFireFunctions,
              private snackBar: MatSnackBar) {
    this.userService.findAll().subscribe((users: User[]) => {
      this.loading = false;
      this.users = users;
    });
  }

  addAdmin = (user: User) => {
    this.loading = true;
    const addAdminRole = this.functions.httpsCallable('addAdminRole');
    addAdminRole({ email: user.email }).subscribe(data => {
      this.loading = false;
      if(!data.err)
        this.snackBar.open(`${user.displayName} ahora es administrador`, 'Entendido!', {
          duration: 3000
        })
    }, err => console.error(err));
  }

  addProfessor = (user: User) => {
    this.loading = true;
    const addProfessorRole = this.functions.httpsCallable('addProfessorRole');
    addProfessorRole({ email: user.email }).subscribe(data => {
      this.loading = false;
      this.snackBar.open(`${user.displayName} ahora es profesor`, 'Entendido!', {
        duration: 3000
      })
    }, err => console.error(err));
  }

  removeProfessor = (user: User) => {
    this.loading = true;
    const removeProfessorRole = this.functions.httpsCallable('removeProfessorRole');
    removeProfessorRole({ email: user.email }).subscribe(data => {
      
      this.loading = false;
      this.snackBar.open(`${user.displayName} ahora es estudiante`, 'Entendido!', {
        duration: 3000
      })
    }, err => console.error(err));
  }

}
