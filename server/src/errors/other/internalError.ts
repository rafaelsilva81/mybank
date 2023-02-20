import { AppError } from '../appError'

export default class InternalError extends AppError {
  public status = 500
  constructor(message: string) {
    super(message)
    this.name = 'InternalError'
  }
}
