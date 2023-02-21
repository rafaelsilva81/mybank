import { AppError } from '../appError'

export default class InsufficientFundsError extends AppError {
  public status = 403
  constructor(message: string) {
    super(message)
    this.name = 'InsufficientFundsError'
  }
}
