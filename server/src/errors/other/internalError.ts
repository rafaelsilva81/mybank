import { AppError } from '../appError'

/*  
  This is a generic InternalError class that extends the AppError class.
  
  OBS: Other generic errors will also give a status code 500 (Internal Server Error) in the error handler.
  But if you want to give a specific message with this status, you can use this class.
*/
export default class InternalError extends AppError {
  public status = 500
  constructor(message: string) {
    super(message)
    this.name = 'InternalError'
  }
}
