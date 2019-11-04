export interface Homework {
  uid?: string,
  title: string,
  description: string,
  dueDate: Date,
  creationDate: Date,
  completed?: boolean
}