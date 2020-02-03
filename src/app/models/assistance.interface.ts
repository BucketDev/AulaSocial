import {Student} from './student.interface';
import {Moment} from 'moment';

export interface Assistance {
  uid?: string;
  students: Student[];
  date: Date;
  creationDate: Date;
}
