import { AppError } from '../appError'

export default class BadRequestError extends AppError {
  public status = 400
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}
