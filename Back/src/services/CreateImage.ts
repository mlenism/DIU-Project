import { Request } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import LastImage from '../services/LastImage'

class CreateImage {

  public async insertImage(req: Request): Promise<Boolean> {
    console.info(req.file);
    const buffer = req.file!.buffer;

    let dir = this.makePath(LastImage.ID);

    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }

    dir += `/${LastImage.ID}.webp`

    try {
        const img = sharp(buffer, {animated: true});
        const meta = await img.metadata();
        console.log(meta)
        if (meta.height! > 1080 && !meta.pages) {
            await img.webp({ quality: 100, reductionEffort: 6 }).rotate().resize({ height: 1080 }).toFile(dir);
        } else {
            if (meta.pageHeight! > 720) {
                await img.webp({ quality: 100, pageHeight: 720, reductionEffort: 6 }).rotate().resize({height: meta.pages!*720}).toFile(dir);
            } else {
                await img.webp({ quality: 100, pageHeight: meta.pageHeight, reductionEffort: 6 }).toFile(dir);
            }
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
  }

  public async deleteImage(id: number): Promise<Boolean> {
      let dir = `${this.makePath(id)}/${id}.webp`;
      fs.unlinkSync(dir);
      return true;
  }

  public makePath(id: number) {
      const hundreds_units = Math.floor(id / 100);
      return `build/public/images/${hundreds_units}`;
  }

  public async copyImage(id: number): Promise<Boolean> {
    let dir = `${this.makePath(id)}/${id}.webp`;
    fs.copyFileSync (`build/public/images/0/1.webp`, dir);
    return true;
  }
}

const createImage = new CreateImage();
export default createImage;