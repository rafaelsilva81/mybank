import { z } from 'zod'

import { prisma } from '../config/prisma'
import { UpdateUserDto, UpdateUserPasswordDto } from '../dto/user'
import { AppError } from '../errors/appError'
import BadRequestError from '../errors/other/badRequestError'
import InternalError from '../errors/other/internalError'

import { FileUploadService } from './fileUploadService'

export class UserService {
  fileUploadService: FileUploadService

  constructor() {
    this.fileUploadService = new FileUploadService()
  }

  async uploadAvatar(file: Express.Multer.File, id: string) {
    try {
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
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.error(error)
      throw new InternalError('Error updating the avatar')
    }
  }

  async updateUser(id: string, userData: z.infer<typeof UpdateUserDto>) {
    try {
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
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.error(error)
      throw new InternalError('Error updating user profile')
    }
  }

  async updatePassword(
    id: string,
    userData: z.infer<typeof UpdateUserPasswordDto>
  ) {
    try {
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
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.error(error)
      throw new InternalError('Error updating user profile')
    }
  }

  async getUser(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        throw new BadRequestError('User not found')
      }

      return user
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.error(error)
      throw new InternalError('Error getting user')
    }
  }

  async deleteUser(id: string) {
    try {
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
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.error(error)
      throw new InternalError('Error deleting user')
    }
  }
}
