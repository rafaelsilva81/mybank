import jwt from 'jsonwebtoken'

import { env } from '../config/env'

/* 
  This is a JWT token sign middleware using jsonwebtoken.
  It will be called by authService to sign the token and send it to the user on login.
*/

export function signJwtToken(payload: { id: string }) {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  })

  console.log(token)
  return token
}
