import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/providers/auth/fire-auth.service';
import { GapiService } from 'src/app/providers/shared/gapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  calendarEvents: [];

  constructor(private fireAuth: FireAuthService,
              private gapiService: GapiService) {
  }

  ngOnInit() {
  }

}
