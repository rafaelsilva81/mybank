import bcrypt from "bcrypt";

export function checkPassword(passwordInput: string, passwordHash: string) {
  return bcrypt.compareSync(passwordInput, passwordHash);
}
