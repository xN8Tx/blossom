import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

export const PORT = process.env.PORT || 6060;

export const ORIGIN_URL = process.env.ORIGIN_URL;
export const HTTP_URL = process.env.HTTP_URL;
export const WS_URL = process.env.WS_SERVER;

export const UPLOAD_FOLDER =
  path.dirname(path.dirname(fileURLToPath(import.meta.url))) + '/upload';

export const TEMP_FOLDER =
  path.dirname(path.dirname(fileURLToPath(import.meta.url))) + '/temp';
