import bcrypt from "bcrypt";

export async function checkPassword(
  passwordInput: string,
  passwordHash: string
) {
  return await bcrypt.compare(passwordInput, passwordHash);
}
