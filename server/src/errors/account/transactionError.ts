import { AppError } from '../appError'

/* 
  This is a custom error class that extends the AppError class.
  It will be used to throw an error when the transaction is not valid.
*/
export default class TransactionError extends AppError {
  public status = 403
  constructor(message: string) {
    super(message)
    this.name = 'TransactionError'
  }
}
