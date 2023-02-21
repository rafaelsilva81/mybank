import { AppError } from '../appError'

/* 
  This is a custom error class that extends the AppError class.
  It will be used to throw an error when the media type is not supported.
*/
export default class UnsupportedMediaError extends AppError {
  public status = 415
  constructor(message: string) {
    super(message)
    this.name = 'UnsupportedMediaError'
  }
}
