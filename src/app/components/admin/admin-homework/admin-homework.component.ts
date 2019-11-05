import { Component, OnInit, OnDestroy } from '@angular/core';
import { Homework } from 'src/app/models/homework.interface';
import { GroupService } from 'src/app/providers/group/group.service';
import { Group } from 'src/app/models/group.interface';
import { HomeworkService } from 'src/app/providers/group/homework.service';
import { GapiService } from 'src/app/providers/shared/gapi.service';

@Component({
  selector: 'app-admin-homework',
  templateUrl: './admin-homework.component.html',
  styleUrls: ['./admin-homework.component.css']
})
export class AdminHomeworkComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  homeworks: Homework[];

  constructor(private groupService: GroupService,
              private homeworkService: HomeworkService,
              private gapiService: GapiService) {
    groupService.findAll().subscribe((groups: Group[]) => {
      this.homeworks = [];
      groups.forEach((group: Group) => {
        homeworkService.findAllAdminByGroupId(group.uid).subscribe((homeworks: Homework[]) => this.homeworks = homeworks);
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
  }

  ngOnInit() {
  }

  deleteHomework = (homework: Homework) => {
    this.loading = true;
    this.homeworkService.delete(homework.groupId, homework.uid)
      .then(() => {
        this.homeworks = this.homeworks.filter((_homework: Homework) => homework.uid !== _homework.uid);
      })
      .then(() => this.gapiService.deleteEvent(homework.eventId))
      .then(() => this.loading = false);
  }

}
