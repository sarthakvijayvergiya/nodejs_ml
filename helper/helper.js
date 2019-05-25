const multer  =   require('multer');
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');


const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});


class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}

module.exports = {upload,Resize};