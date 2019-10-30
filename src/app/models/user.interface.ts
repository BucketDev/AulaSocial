export interface User {
  uid: string,
  displayName: string,
  email: string,
  photoURL: string,
  professor?: boolean,
  admin?: boolean
}