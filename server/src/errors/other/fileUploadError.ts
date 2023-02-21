import { AppError } from '../appError'

/* 
  This is a custom error class that extends the AppError class.
  It will be used to throw an error when the file upload is not valid.
  It's used on the FileUploadService
*/
export default class FileUploadError extends AppError {
  public status = 500
  constructor(message: string) {
    super(message)
    this.name = 'FileUploadError'
  }
}
