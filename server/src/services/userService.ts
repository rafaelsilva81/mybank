import { prisma } from "../config/prisma";
import FileUploadError from "../errors/other/fileUploadError";
import InternalError from "../errors/other/internalError";
import { FileUploadService } from "./fileUploadService";

export class UserService {
  constructor(private fileUploadService: FileUploadService) {}

  async uploadAvatar(file: Express.Multer.File, userId: string) {
    try {
      const path = await this.fileUploadService.uploadAvatar(file);

      await prisma.user.update({
        where: { id: userId },
        data: { avatar: path },
      });
    } catch (error) {
      if (error instanceof FileUploadError) {
        throw error;
      }
      console.error(error);
      throw new InternalError("Error updating the avatar");
    }
  }
}
