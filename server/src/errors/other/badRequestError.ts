import { AppError } from '../appError'

/* 
  This is a generic BadRequestError class that extends the AppError class.
*/
export default class BadRequestError extends AppError {
  public status = 400
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}
