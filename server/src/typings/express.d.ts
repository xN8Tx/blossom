import type { CookieOptions, Request } from 'express';

interface MyCookie extends CookieOptions {
  refreshToken: string;
}

interface MyRequest extends Request {
  id: number;
  email: string;
  cookies: MyCookie;
}

export type { MyRequest, CookieRequest };
