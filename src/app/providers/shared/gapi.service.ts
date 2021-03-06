import { Injectable } from '@angular/core';
import { CalendarEvent } from 'src/app/models/calendar-event.interface';
import { HomeworkService } from '../group/homework.service';
import { GroupService } from '../group/group.service';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GapiService {

  public calendarId: string;

  constructor() { }

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

  deleteEvent = async (eventId: string) => {
    return await gapi.client.calendar.events.delete({
      calendarId: encodeURIComponent('primary'),
      eventId,
      sendNotifications: false
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
