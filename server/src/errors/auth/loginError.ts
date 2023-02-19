import { AppError } from "../appError";

export default class LoginError extends AppError {
  public status = 401;
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}
