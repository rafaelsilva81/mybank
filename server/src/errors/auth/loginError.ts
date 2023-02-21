import { AppError } from '../appError'

/* 
  This is a custom error class that extends the AppError class.
  It will be used to throw an error when the login is not valid.
*/
export default class LoginError extends AppError {
  public status = 401
  constructor(message: string) {
    super(message)
    this.name = 'LoginError'
  }
}
