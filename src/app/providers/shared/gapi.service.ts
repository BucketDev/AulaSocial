import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'src/app/models/calendar-event.interface';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GapiService {

  public calendarId: string;

  constructor() {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: environment.drive.apiKey,
        clientId: environment.drive.clientId,
        discoveryDocs: environment.drive.discoveryDocs,
        scope: environment.drive.scopes.join(' ')
      });
      gapi.client.load('calendar', 'v3', async () => {});
    });
  }

  getCalendarEvents = async () => {
    return await gapi.client.calendar.events.list({
      calendarId: encodeURIComponent('primary'),
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      q: 'AulaSocial',
      maxResults: 10,
      orderBy: 'startTime'
    });
  }

  createEvent = async (event: CalendarEvent) => {
    return await gapi.client.calendar.events.insert({
      calendarId: encodeURIComponent('primary'),
      resource: {
        description: 'AulaSocial',
        location: event.location,
        summary: event.summary,
        end: {
          dateTime: event.end
        },
        start: {
          dateTime: event.start
        },
        attendees: event.attendees
      }
    })
  }

  getCalendar = async () => {
    const results = await gapi.client.calendar.calendarList.list();
    let calendar = results.result.items.find((item: any) => item['summary'] === 'AulaSocial');
    if(!calendar) {
      calendar = await gapi.client.calendar.calendars.insert({
        summary: 'AulaSocial'
      });
    }
    localStorage.setItem('calendarId', calendar['id']);
  }

}
