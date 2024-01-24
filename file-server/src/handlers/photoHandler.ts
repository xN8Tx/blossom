import sharp from 'sharp';

import { UPLOAD_FOLDER } from '../constant.js';
import createFileId from '../utils/createFileId.js';

const compressImage = async (fileBase64: string) => {
  const fileName = createFileId();

  const pathToFile = `${UPLOAD_FOLDER}/${fileName}.webp`;

  const base64Image = fileBase64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Image, 'base64');

  await sharp(buffer, { animated: true }).webp().toFile(pathToFile);

  return `${fileName}.webp`;
};

export default compressImage;
