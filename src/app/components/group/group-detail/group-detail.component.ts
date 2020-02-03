import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { GroupService } from 'src/app/providers/group/group.service';
import { StudentService } from 'src/app/providers/group/student.service';

import { Group } from 'src/app/models/group.interface';
import { Student } from 'src/app/models/student.interface';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/providers/user/user.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnDestroy {

  group: Group;
  students: Student[];
  groupSub: Subscription;
  studentSub: Subscription;
  hasJoined = false;
  loading = true;

  constructor(private activatedRoute: ActivatedRoute,
              public groupService: GroupService,
              public userService: UserService,
              private studentService: StudentService,
              public fireAuth: FireAuthService,
              private snackBar: MatSnackBar) {
    const { uid } = this.activatedRoute.snapshot.params;
    groupService.groupId = uid;
    this.groupSub = groupService.findByGroupId(uid).subscribe((group: Group) => {
      this.group = group;
      this.studentSub = this.studentService.findAll(uid)
        .subscribe((students: Student[]) =>  {
          this.hasJoined = !!students.find((student: Student) => student.uid === fireAuth.user.uid);
          this.groupService.students = students;
          this.loading = false;
        });
    });
  }

  addStudent = () => {
    this.studentService.save(this.groupService.groupId)
      .then(() => {
        this.userService.addGroup({uid: this.groupService.groupId, ...this.group});
      })
      .then(() => {
        const ref = this.snackBar.open(`Te has unido al grupo ${this.group.title}`, 'Cancelar', {
          duration: 5000
        });
        ref.onAction().subscribe(this.removeStudent);
      });
  }

  removeStudent = () => this.studentService.delete(this.groupService.groupId)
    .then(() => {
      this.userService.removeGroup(this.groupService.groupId);
    })
    .then(() => this.snackBar.open(`Has abandonado el grupo ${this.group.title}`, '', {
      duration: 5000
    }))

  ngOnDestroy(): void {
    this.studentSub.unsubscribe();
    this.groupSub.unsubscribe();
  }
}
