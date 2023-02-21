import { z } from 'zod'

import { prisma } from '../config/prisma'
import { UpdateUserDto, UpdateUserPasswordDto } from '../dto/user'
import BadRequestError from '../errors/other/badRequestError'

import { FileUploadService } from './fileUploadService'

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

    return updatedUser
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

    if (user.password !== userData.password) {
      throw new BadRequestError('Incorrect password')
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

    return user
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new BadRequestError('User not found')
    }

    await prisma.user.delete({
      where: { id },
    })

    return true
  }
}
