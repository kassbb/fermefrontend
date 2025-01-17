export interface User {
  email: string
  id: number
  username: string
  password? : string
}
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}