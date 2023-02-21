import fs from 'fs'

import sharp from 'sharp'

import FileUploadError from '../errors/other/fileUploadError'

/* 
  This file will be used by other serives when they need to upload a file.
  It will work with the multer middleware to upload the file.
  It will compress the image and return the relative path to the file.
*/
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
      // this will cast the error to a FileUploadError
      console.error(error)
      throw new FileUploadError('Error uploading file')
    }
  }
}
