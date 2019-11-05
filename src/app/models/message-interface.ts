export interface Message {
  uid?: string,
  userId: string,
  message: string,
  photoURL: string,
  displayName: string,
  email: string,
  creationDate: Date
}