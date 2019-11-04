import { Student } from './student.interface';

export interface CalendarEvent {
  summary: string,
  location: string,
  start: Date,
  end: Date
  attendees: any[],
}