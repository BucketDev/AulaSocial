import { Component, OnInit } from '@angular/core';

import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { UserService } from 'src/app/providers/user/user.service';

import { User } from 'src/app/models/user.interface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

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
      if(!data.err)
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
      if(!data.err)
        this.snackBar.open(`${user.displayName} ahora es estudiante`, 'Entendido!', {
          duration: 3000
        })
    }, err => console.error(err));
  }

  ngOnInit() {
  }

}
