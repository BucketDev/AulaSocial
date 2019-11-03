import { Component, OnDestroy } from '@angular/core';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { GroupService } from 'src/app/providers/group/group.service';
import { StudentService } from 'src/app/providers/group/student.service';

import { Group } from 'src/app/models/group.interface';
import { Student } from 'src/app/models/student.interface';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  hasJoined: boolean = false;
  loading: boolean = true;
  
  constructor(private activatedRoute: ActivatedRoute,
              public groupService: GroupService,
              private studentService: StudentService,
              public fireAuth: FireAuthService,
              private snackBar: MatSnackBar) {
    this.activatedRoute.params.subscribe(params => {
      this.groupService.groupId = params['uid'];
      groupService.findByGroupId(params['uid'])
        .toPromise().then((group: Group) => {
          this.group = group;
        })
        .then(() => {
          this.studentSub = this.studentService.findAll(params['uid'])
            .subscribe((students: Student[]) =>  {
              this.students = students;
              this.hasJoined = students.find((student: Student) => student.uid === fireAuth.user.uid) ? true : false;
              this.loading = false;
            });
        })
    });
  }

  addStudent = () => {
    this.studentService.save(this.groupService.groupId)
      .then(() => {
        let ref = this.snackBar.open(`Te has unido al grupo ${this.group.title}`, 'Cancelar', {
          duration: 5000
        });
        ref.onAction().subscribe(this.removeStudent);
      });
  }

  removeStudent = () => this.studentService.delete(this.groupService.groupId)
    .then(() => this.snackBar.open(`Has abandonado el grupo ${this.group.title}`, '', {
      duration: 5000
    }));
    
  ngOnDestroy(): void {
    this.studentSub.unsubscribe();
  }
}
