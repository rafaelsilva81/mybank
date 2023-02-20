import { prisma } from '../config/prisma'
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
}
