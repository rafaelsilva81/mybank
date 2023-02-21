import { Router as expressRouter } from 'express'
import { Request as JWTRequest } from 'express-jwt'

import { UpdateUserDto, UpdateUserPasswordDto } from '../dto/user'
import FileUploadError from '../errors/other/fileUploadError'
import fileUploader from '../middlewares/fileUploader'
import { UserService } from '../services/userService'

const userRouter = expressRouter()
const userService = new UserService()

/* 
  This file is a router. It will handle all the routes that start with /user.
  It will call the userService to handle the business logic.  
*/

userRouter.get('/', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id

    const user = await userService.getUser(id)

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

userRouter.patch(
  '/avatar',
  fileUploader.single('avatar'),
  async (req: JWTRequest, res, next) => {
    try {
      const file = req.file

      if (!file) {
        throw new FileUploadError('A file is required')
      }

      await userService.uploadAvatar(file, req.auth?.id)

      res.status(200).json({ message: 'Avatar uploaded' })
    } catch (error) {
      next(error)
    }
  }
)

userRouter.patch('/profile', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id

    const userData = UpdateUserDto.parse(req.body)

    const updatedUser = await userService.updateUser(id, userData)

    res.status(204).json(updatedUser)
  } catch (error) {
    next(error)
  }
})

userRouter.patch('/password', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id

    const userData = UpdateUserPasswordDto.parse(req.body)

    await userService.updatePassword(id, userData)

    // Clear the cookie (logout)
    res.clearCookie('token')
    res.status(204).json({})
  } catch (error) {
    console.debug('Found error, should call error handler')
    next(error)
  }
})

userRouter.delete('/', async (req: JWTRequest, res, next) => {
  try {
    const id = req.auth?.id

    await userService.deleteUser(id)

    // Clear the cookie (logout)
    res.clearCookie('token')
    res.status(204).json({})
  } catch (error) {
    next(error)
  }
})

export default userRouter
