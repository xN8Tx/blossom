import jwt, { JwtPayload } from 'jsonwebtoken';

import type { Request } from 'express';
import type { MyRequest } from '../typings/express';

const checkId = (id: string, req: Request) => {
  const authHeader = (req as MyRequest).headers['authorization'];
  const token = authHeader?.split(' ').pop();

  const decodeToken = jwt.decode(token!);
  const decodeId = (decodeToken as JwtPayload).id;

  if (decodeId !== id) return false;
  return true;
};

export default checkId;
