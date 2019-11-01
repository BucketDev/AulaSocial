export interface File {
  name?: string,
  downloadURL?: Promise<string>,
  contentType?: string,
  timeCreated?: Date, 
  uid?: string,
  photoURL?: string,
  email?: string
}