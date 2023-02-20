import { AppError } from '../appError'

export default class FileUploadError extends AppError {
  public status = 500
  constructor(message: string) {
    super(message)
    this.name = 'FileUploadError'
  }
}
