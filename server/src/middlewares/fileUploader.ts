import path from 'path'

import multer from 'multer'

/* 
    This is a middleware that handles file uploads.
    it will be called inside the routes.
    When called with the FileUploadService it will also
    compress the image and save it in the uploads folder.
*/
const fileUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../../uploads')
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
})

export default fileUploader
