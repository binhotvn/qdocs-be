import { diskStorage } from 'multer';
import { UtilsService } from 'src/utils/utils.service';
const utils = new UtilsService();
export const multerConfig = {
  storage: diskStorage({
    destination: './public/file',
    filename: (req, file, cb) => {
      const fileName: string = utils
        .removeVietnameseTones(file.originalname.split('.')[0])
        .toUpperCase()
        .toLowerCase()
        .replace(/\s+/g, '-');
      cb(
        null,
        `${utils.randomToken(4)}--${fileName}.` +
          file.originalname.split('.')[1],
      );
    },
  }),
};
