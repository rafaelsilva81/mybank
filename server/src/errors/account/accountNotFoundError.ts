import { AppError } from '../appError'

/* 
  This is a custom error class that extends the AppError class.
  It will be used to throw an error when the account is not found.
*/
export default class AccountNotFoundError extends AppError {
  public status = 400
  constructor(message: string) {
    super(message)
    this.name = 'AccountNotFoundError'
  }
}
