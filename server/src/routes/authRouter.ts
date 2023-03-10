import dayjs from 'dayjs'
import { Router as expressRouter } from 'express'

import { CreateUserDto, LoginUserDto } from '../dto/user'
import { signJwtToken } from '../middlewares/signJwtToken'
import { AuthService } from '../services/authService'

const authRouter = expressRouter()
const authService = new AuthService()

/* 
  This file is a router. It will handle all the routes that start with /auth.
  It will call the authService to handle the business logic.
*/

authRouter.post('/register', async (req, res, next) => {
  try {
    const userData = CreateUserDto.parse(req.body)

    const newUser = await authService.registerUser(userData)

    res.status(201).json({ newUser })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const userData = LoginUserDto.parse(req.body)

    const loggedUser = await authService.loginUser(userData)
    const token = signJwtToken({ id: loggedUser.id })

    res.status(200).json({
      id: loggedUser.id,
      token: token,
    })
  } catch (error) {
    next(error)
  }
})

authRouter.get('/logout', (req, res, next) => {
  try {
    res.status(204).json({})
  } catch (error) {
    next(error)
  }
})

export default authRouter
