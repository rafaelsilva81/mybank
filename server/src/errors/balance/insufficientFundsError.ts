import { AppError } from '../appError'

/* 
  This is a custom error class that extends the AppError class.
  It will be used to throw an error when the account has insufficient funds.
  Used when the user tries to withdraw more than he has
  Or when the user doesn't have funds to pay a loan
*/
export default class InsufficientFundsError extends AppError {
  public status = 403
  constructor(message: string) {
    super(message)
    this.name = 'InsufficientFundsError'
  }
}
