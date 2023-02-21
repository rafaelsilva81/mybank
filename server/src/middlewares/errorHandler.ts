import { Response, Request, NextFunction } from 'express'
import { Request as JWTRequest } from 'express-jwt'
import { ZodError } from 'zod'

import { AppError } from '../errors/appError'

/* 
  This is a middleware that handles errors.
  It is used in the app.ts file.
  If the error is an instance of AppError, it will return a json with the error message and the status code.
  If the error is an instance of ZodError, it will return a json with the error message and the status code 400.
  Any other error will return a json with the error message and the status code 500.
  
  OBS: The next function is not used in this middleware, but it is required by express to work. 
  (eslint still complains about it)
*/

export default function errorHandler(
  err: unknown,
  req: JWTRequest | Request, // JWTRequest is a type from express-jwt
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  console.error('Error handler: ', err)
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message })
  } else if (err instanceof ZodError) {
    const message = err.issues.map((issue) => issue.message).join('\n')
    return res.status(400).json({ message: 'Validation error: ' + message })
  }
  return res.status(500).json({ message: 'Server error' })
}
