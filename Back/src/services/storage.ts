import multer from 'multer';
import path from 'path';
import fs from 'fs'

class MulterConfig {

  private upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|webp|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
          return cb(null, true);
      } else {
          return cb(new Error(`Error: File upload only supports the following filetypes - ${filetypes}`));
      }
    }
  }).single('image');

  getUpload() {
    return this.upload;
  }

}

const config = new MulterConfig();
export default config.getUpload().bind(this);