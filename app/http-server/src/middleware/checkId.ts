import jwt from 'jsonwebtoken';
import logger from '../logger';

import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { MyRequest } from '../typings/express';

const checkId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const authHeader = (req as MyRequest).headers['authorization'];
  const token = authHeader?.split(' ').pop();

  const decodeToken = jwt.decode(token!);
  const decodeId = (decodeToken as JwtPayload).id;

  if (decodeId !== id) {
    logger.error(
      'Error in middleware checkId. decodeId !== id',
      `${JSON.stringify(req.params)}\n${JSON.stringify(req.body)}`,
    );
    return res.status(403).json({ message: 'Invalid access' });
  }

  next();
};

export default checkId;
