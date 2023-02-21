/* 
  This is an abstract AppError class that will be extended by other error classes.
  All error classes that extend this class will have a status property. 
*/
export abstract class AppError extends Error {
  public abstract status: number
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
