export interface Evaluation {
  uid?: string,
  groupId?: string,
  title: string,
  description: string,
  dueDate: Date,
  creationDate: Date,
  completed?: boolean,
  eventId?: string
}