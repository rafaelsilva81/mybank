import { z } from 'zod'

import eventEmitter from '../config/events'
import { prisma } from '../config/prisma'
import { CreateUserDto, LoginUserDto } from '../dto/user'
import LoginError from '../errors/auth/loginError'
import RegisterError from '../errors/auth/registerError'
import { checkPassword } from '../middlewares/checkPassword'
import { hashPassword } from '../middlewares/hashPassword'

export class AuthService {
  async registerUser(user: z.infer<typeof CreateUserDto>) {
    const hashed = await hashPassword(user.password)

    const checkUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    if (checkUser) {
      throw new RegisterError('E-mail já cadastrado')
    }

    const newUser = await prisma.user.create({
      data: {
        ...user,
        password: hashed,
      },
    })

    eventEmitter.emit('register', newUser)

    return newUser
  }

  async loginUser(user: z.infer<typeof LoginUserDto>) {
    const checkUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    if (!checkUser) {
      throw new LoginError('E-mail ou senha incorretos')
    }

    const checkPasswordResult = checkPassword(user.password, checkUser.password)

    if (!checkPasswordResult) {
      throw new LoginError('E-mail ou senha incorretos')
    }

    return checkUser
  }
}
