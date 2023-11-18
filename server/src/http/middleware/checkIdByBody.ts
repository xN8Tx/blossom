import jwt from 'jsonwebtoken';

import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { MyRequest } from '../../typings/express';

const checkIdByBody = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  const authHeader = (req as MyRequest).headers['authorization'];
  const token = authHeader?.split(' ').pop();

  const decodeToken = jwt.decode(token!);
  const decodeId = (decodeToken as JwtPayload).id;

  if (decodeId !== id) {
    return res.status(403).json({ message: 'Invalid access' });
  }

  next();
};

export default checkIdByBody;
