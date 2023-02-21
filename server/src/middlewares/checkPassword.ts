import bcrypt from 'bcrypt'

/* 
  This is a password check middleware using bcrypt.
  It will be called by authService to check if the password is correct.
*/
export function checkPassword(passwordInput: string, passwordHash: string) {
  return bcrypt.compareSync(passwordInput, passwordHash)
}
