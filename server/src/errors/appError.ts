export abstract class AppError extends Error {
  public abstract status: number
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
