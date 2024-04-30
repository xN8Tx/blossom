import fs from 'fs';
import path from 'path';
import * as mimeTypes from 'mime-types';

import { HTTP_URL, UPLOAD_FOLDER } from '../constant';

import saveFile from '../handlers/fileHandler';
import compressImage from '../handlers/photoHandler';
import compressVideo from '../handlers/videoHandler';

import type { Request, Response } from 'express';
import logger from '../logger';

class Controller {
  async post(req: Request, res: Response) {
    try {
      const { file, fileName, fileType } = req.body;

      if (req.ip === HTTP_URL) {
        return res.status(403).send({ message: 'Invalid access' });
      }

      const type = fileType.split('/')[0];

      switch (type) {
        case 'image': {
          compressImage(file)
            .then((name) => res.status(200).send({ message: name }))
            .catch((err) => {
              throw new Error(
                `Can not upload photo, Caught error: ${JSON.stringify(err)}`,
              );
            });
          break;
        }
        case 'video': {
          compressVideo(file, fileName)
            .then((name) => res.status(200).send({ message: name }))
            .catch((err) => {
              throw new Error(
                `Can not upload video, Caught error: ${JSON.stringify(err)}`,
              );
            });
          break;
        }
        default: {
          saveFile(file, fileName)
            .then((name) => res.status(200).send({ message: name }))
            .catch((err) => {
              throw new Error(
                `Can not upload file, Caught error: ${JSON.stringify(err)}`,
              );
            });
          break;
        }
      }
    } catch (error) {
      logger.error('Error in controller post.', JSON.stringify(error));
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
  async get(req: Request, res: Response) {
    try {
      const fileId = req.params.fileId;
      const filePath = path.join(UPLOAD_FOLDER, fileId);

      try {
        await new Promise((resolve, reject) => {
          fs.access(filePath, (err) => {
            if (err) reject(err);
            resolve(filePath);
          });
        });

        const contentType =
          mimeTypes.lookup(filePath) || 'application/octet-stream';

        res.setHeader('Content-Type', contentType);

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      } catch (error) {
        console.error('Error accessing file:', JSON.stringify(error));
        res.status(404).send('File not found');
      }
    } catch (error) {
      logger.error('Error in controller get', JSON.stringify(error));
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { fileId } = req.params;

      const pathToFile = `${UPLOAD_FOLDER}/${fileId}`;

      if (req.ip === HTTP_URL) {
        return res.status(403).send({ message: 'Invalid access' });
      }

      try {
        fs.unlinkSync(pathToFile);
        res.status(200).send({ message: 'Success' });
      } catch (error) {
        throw new Error(`Can not delete file. Caught error: ${error}`);
      }
    } catch (error) {
      logger.error('Error in controller delete', JSON.stringify(error));
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

const controller = new Controller();

export default controller;
