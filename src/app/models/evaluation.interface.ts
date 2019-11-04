export interface Evaluation {
  uid?: string,
  title: string,
  description: string,
  dueDate: Date,
  creationDate: Date,
  completed?: boolean
}