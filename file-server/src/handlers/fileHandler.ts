import fs from 'fs';

import createFileId from '../utils/createFileId';
import { UPLOAD_FOLDER } from '../constant';

const saveFile = async (fileBase64: string, fileName: string) => {
  const uniqId = createFileId();

  const fileExtension = fileName.split('.').pop();
  const nameWithoutExtension = fileName
    .split('.')
    .slice(0, -1)
    .join('.') // remove extension
    .split(' ')
    .join('_'); // remove spaces
  const newFileName = `${nameWithoutExtension}-${uniqId}.${fileExtension}`;

  const pathToFile = `${UPLOAD_FOLDER}/${newFileName}`;

  const base64Image = fileBase64.split(',').pop()?.toString();

  if (!base64Image) return false;

  const file = Buffer.from(base64Image, 'base64');

  await new Promise((resolve, reject) => {
    fs.writeFile(pathToFile, file, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });

  return newFileName;
};

export default saveFile;
