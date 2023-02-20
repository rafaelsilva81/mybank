import dayjs from 'dayjs'
import { Router as expressRouter } from 'express'
import { ZodError } from 'zod'

import { CreateUserDto, LoginUserDto } from '../dto/user'
import { AppError } from '../errors/appError'
import { signJwtToken } from '../middlewares/signJwtToken'
import { AuthService } from '../services/authService'

const authRouter = expressRouter()
const authService = new AuthService()

authRouter.post('/register', async (req, res) => {
  try {
    const userData = CreateUserDto.parse(req.body)

    const newUser = await authService.registerUser(userData)

    res.status(201).json({ newUser })
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: 'Invalid data' })
    } else if (error instanceof AppError) {
      res.status(error.status).json({ message: error.message })
    }
  }
})

authRouter.post('/login', async (req, res) => {
  try {
    const userData = LoginUserDto.parse(req.body)

    const loggedUser = await authService.loginUser(userData)
    const token = signJwtToken({ id: loggedUser.id })

    // Sending the token via cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: dayjs().add(1, 'day').toDate(),
    })

    res.status(200).json(loggedUser)
  } catch (error: unknown) {
    res.clearCookie('token')
    if (error instanceof ZodError) {
      res.status(400).json({ message: 'Invalid data' })
    } else if (error instanceof AppError) {
      res.status(error.status).json({ message: error.message })
    }
  }
})

authRouter.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).json({})
})

export default authRouter
