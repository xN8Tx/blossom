import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

import { TEMP_FOLDER, UPLOAD_FOLDER } from '../constant';
import createFileId from '../utils/createFileId.js';

const compressVideo = async (fileBase64: string, fileName: string) => {
  const uniqCode = createFileId();
  const fileExtension = fileName.split('.').pop();

  const pathToFile = `${UPLOAD_FOLDER}/${fileName}.webm`;

  const base64Video = fileBase64.replace(/^data:video\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Video, 'base64');

  const tempFile = `${TEMP_FOLDER}/${uniqCode}.${fileExtension}`;

  fs.writeFileSync(tempFile, buffer);
  await new Promise((resolve, reject) => {
    ffmpeg(tempFile)
      .outputOptions(['-c:v libvpx-vp9', '-b:v 1M', '-c:a libvorbis'])
      .on('end', resolve)
      .on('error', (err) => {
        console.log('Video error: ', err);
        reject();
      })
      .save(pathToFile);
  });
  fs.unlink(tempFile, (err) => {
    console.log('Cant delete file. ', err);
  });

  return `${fileName}.webm`;
};

export default compressVideo;
