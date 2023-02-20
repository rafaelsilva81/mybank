import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import FileUploadError from "../errors/other/fileUploadError";

export class FileUploadService {
  private upload = multer({
    storage: multer.diskStorage({
      destination: "uploads/",
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only images are allowed"));
      }
      cb(null, true);
    },
  });

  public async uploadAvatar(picutre: Express.Multer.File) {
    try {
      const compressedImage = await sharp(picutre.path)
        .resize(200, 200)
        .jpeg({ quality: 80 })
        .toBuffer();

      fs.writeFileSync(picutre.path, compressedImage);

      return picutre.path;
    } catch (error) {
      console.error(error);
      throw new FileUploadError("Error while uploading the file");
    }
  }
}
