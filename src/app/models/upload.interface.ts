export interface Upload {
  $key?: string
  file: File,
  name: string,
  url?: string,
  createdAt: Date
}
