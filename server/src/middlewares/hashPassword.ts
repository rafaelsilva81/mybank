import bcrypt from 'bcrypt'

/* 
  This is a password hash middleware using bcrypt.
  It will be called by authService to hash the password and save it in the database.
*/

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}
