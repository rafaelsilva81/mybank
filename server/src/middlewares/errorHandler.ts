import { Response, Request } from 'express'
import { Request as JWTRequest } from 'express-jwt'
import { ZodError } from 'zod'

import { AppError } from '../errors/appError'

export default function errorHandler(
  err: unknown,
  req: JWTRequest | Request, // JWTRequest is a type from express-jwt
  res: Response
) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message })
  } else if (err instanceof ZodError) {
    const message = err.issues.map((issue) => issue.message).join('\n')
    return res.status(400).json({ message: 'Validation error: ' + message })
  }
  return res.status(500).json({ message: 'Server error' })
}
