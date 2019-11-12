import { Component, OnInit } from '@angular/core';
import { GapiService } from 'src/app/providers/shared/gapi.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  loading: boolean;
  events: any[] = [];

  constructor(private gapiService: GapiService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }
  
  ngOnInit() {
    setTimeout(this.getCalendarEvents, 1000);
  }

  getCalendarURL = () => `https://png.icons8.com/color/40/calendar-${new Date().getDate()}.png`

  getCalendarEvents = () => {
    this.loading = true;
    this.gapiService.getCalendarEvents()
    .then((events: any) => {
      this.events = events.result.items;
      this.loading = false;
    }, () => {
      this.snackBar.open('Ocurrió un error al obtener los eventos, intenta mas tarde', '', {
        duration: 5000
      })
      this.loading = false;
    });
  }

  goToGroup = (event: any) => {
    if(event.location) {
      this.router.navigate([event.location]);
    }
  }

}
