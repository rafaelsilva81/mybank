import { AppError } from '../appError'

/* 
  This is a custom error class that extends the AppError class.
  It will be used to throw an error when the register is not valid.
*/
export default class RegisterError extends AppError {
  public status = 400
  constructor(message: string) {
    super(message)
    this.name = 'RegisterError'
  }
}
