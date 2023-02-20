import fs from 'fs'

import sharp from 'sharp'

import FileUploadError from '../errors/other/fileUploadError'

export class FileUploadService {
  public async uploadAvatar(picture: Express.Multer.File) {
    try {
      const compressedImage = await sharp(picture.path)
        .resize(200, 200)
        .jpeg({ quality: 80 })
        .toBuffer()

      fs.writeFile(picture.path, compressedImage, (err) => {
        if (err) {
          throw err
        }
      })

      //return relative path
      return '/uploads/' + picture.filename
    } catch (error) {
      console.error(error)
      throw new FileUploadError('Error while uploading the file')
    }
  }
}
