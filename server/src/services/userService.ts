import { z } from 'zod'

import { prisma } from '../config/prisma'
import { UpdateUserDto, UpdateUserPasswordDto } from '../dto/user'
import BadRequestError from '../errors/other/badRequestError'
import { checkPassword } from '../middlewares/checkPassword'

import { FileUploadService } from './fileUploadService'

/* 
  This file will contain all the user business logic related to the user.
  It will be used by the userRouter to handle the routes.
*/
export class UserService {
  fileUploadService: FileUploadService

  constructor() {
    this.fileUploadService = new FileUploadService()
  }

  async uploadAvatar(file: Express.Multer.File, id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new BadRequestError('User not found')
    }

    const path = await this.fileUploadService.uploadAvatar(file)

    await prisma.user.update({
      where: { id },
      data: { avatar: path },
    })

    return true
  }

  async updateUser(id: string, userData: z.infer<typeof UpdateUserDto>) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new BadRequestError('User not found')
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...userData },
    })

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    }
  }

  async updatePassword(
    id: string,
    userData: z.infer<typeof UpdateUserPasswordDto>
  ) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new BadRequestError('User not found')
    }

    const passwordMatch = await checkPassword(userData.password, user.password)

    if (!passwordMatch) {
      throw new BadRequestError('Password does not match')
    }

    await prisma.user.update({
      where: { id },
      data: { password: userData.newPassword },
    })

    return true
  }

  async getUser(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new BadRequestError('User not found')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new BadRequestError('User not found')
    }

    // This will also delete the user's account and transactions (cascade delete)
    await prisma.user.delete({
      where: { id },
    })

    return true
  }
}
