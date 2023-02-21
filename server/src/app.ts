import path from 'path'

import cors from 'cors'
import express from 'express'
import { expressjwt as jwt } from 'express-jwt'
import morgan from 'morgan'

import { env } from './config/env'
import errorHandler from './middlewares/errorHandler'
import authRouter from './routes/authRouter'
import userRouter from './routes/userRouter'

/* 
  This is the main file of the application using express.
  It will be used to configure middlewares and routes.
  It will be used to start the server and listen to requests.
*/
const app = express()

async function bootstrap() {
  // Config middleware
  app.use(express.json())
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
  app.use(cors({ exposedHeaders: 'Authorization' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(
    jwt({
      secret: env.JWT_SECRET,
      algorithms: ['HS256'],
      maxAge: '1d',
    }).unless({
      path: [/^\/(auth|uploads)/i],
    })
  )

  // Routes
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
  app.use('/auth', authRouter)
  app.use('/user', userRouter)

  // Other middleware
  app.use(errorHandler)

  // Start server
  app.listen(env.PORT, () => {
    console.debug(`Server is running on port http://localhost:${env.PORT}`)
  })
}

bootstrap().catch((err) => {
  console.error(err)
})

export default app
