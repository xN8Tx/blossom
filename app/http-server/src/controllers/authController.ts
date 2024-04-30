import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

import CustomFetch from '../services/fetch/customFetch.api';
import logger from '../logger';

import checkEmailUnique from '../utils/checkEmailUnique';
import mailAPI from '../services/mail/mail.api';
import jwtGenerate from '../utils/jwtGenerate';

import type { Request, Response } from 'express';
import type { JwtPayload, Secret } from 'jsonwebtoken';
import type { MyRequest } from '../typings/express';
import type { UsersDB } from '../typings/database';

const databaseFetch = new CustomFetch('database');

class AuthController {
  async registrationCode(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Check is email is registered
      const isEmailUnique = await checkEmailUnique(email);
      if (!isEmailUnique) {
        throw new Error(`Email already is registered. Email: ${email}`);
      }

      const code = await databaseFetch.post<number>(`/code/create`, { email });
      await mailAPI.send(email, code);

      res.status(200).json({ message: 'Code send' });
    } catch (error) {
      logger.error(
        'Error in AuthController in registrationCode',
        `${JSON.stringify(error)}`,
      );
      return res.status(500).json({ message: 'Server error' });
    }
  }
  async registration(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, username, code } = req.body;

      // Check code
      const isCodeCorrect = await databaseFetch.post('/code/check', {
        email,
        key: code,
      });

      if (!isCodeCorrect) {
        return res.status(400).json({ message: 'Code is wrong' });
      }

      // Crypt password
      const hashPassword: string = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_CRYPT!,
      ).toString();

      // Add to database
      const user: UsersDB = await databaseFetch.post('/users', {
        firstName,
        lastName,
        username,
        password: hashPassword,
        email: email.toLowerCase(),
      });

      if (!user) {
        logger.error(
          'Error in AuthController in registration. User === null',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(500).json({ message: 'Can not create user!' });
      }
      // Generate tokens
      const { accessToken, refreshToken } = jwtGenerate(user!.id, user!.email);

      // Send tokens
      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json({ message: accessToken });
    } catch (error) {
      logger.error(
        'Error in AuthController in registration',
        `${JSON.stringify(error)}`,
      );
      return res.status(500).json({ message: 'Server error' });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password, code } = req.body;

      // Check user code isn't null
      if (!code) {
        return res.status(400).json({ message: 'Code is wrong' });
      }

      // Check code
      const isCodeCorrect = await databaseFetch.post('/code/check', {
        email,
        key: code,
      });

      if (!isCodeCorrect) {
        return res.status(400).json({ message: 'Code is wrong' });
      }

      // Get users info
      const users: UsersDB[] = await databaseFetch.get(
        `/users/email/${email.toLowerCase()}`,
      );

      // Check correct of user data format
      if (!users) {
        logger.error(
          'Error in AuthController in login. Users === null',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(400).json({ message: 'Check your email/password' });
      }

      if (users.length === 0) {
        return res.status(400).json({ message: 'Check your email/password' });
      }

      // Destruct users info
      const { email: emailDB, password: passwordDB } = users[0];

      // Compare user data
      const decryptPassword = CryptoJS.AES.decrypt(
        passwordDB,
        process.env.PASSWORD_CRYPT!,
      ).toString(CryptoJS.enc.Utf8);

      const isPasswordValid = decryptPassword === password;
      const isEmailValid =
        emailDB.toLocaleLowerCase() === emailDB.toLocaleLowerCase();

      if (!isEmailValid || !isPasswordValid) {
        return res.status(400).json({ message: 'Check your email/password' });
      }

      // Generate jwt tokent
      const { accessToken, refreshToken } = jwtGenerate(
        users![0].id,
        users![0].email,
      );

      // Set cookie with refreshToken
      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ message: accessToken });
    } catch (error) {
      logger.error(
        'Error in AuthController in login',
        `${JSON.stringify(error)}`,
      );
      return res.status(500).json({ message: 'Server error' });
    }
  }
  async loginCode(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Get information about user
      const users = await databaseFetch.get<UsersDB[]>(
        `/users/email/${email.toLowerCase()}`,
      );

      //  Check is response correct
      if (!users) throw new Error('users === null');
      if (users.length === 0) throw new Error('users.length === 0');

      // Create code
      const code = await databaseFetch.post<number>(`/code/create`, { email });

      await mailAPI.send(email, code);
      // Destruct users data
      const { email: emailDB, password: passwordDB } = users[0];

      // Compare password
      const decryptPassword = CryptoJS.AES.decrypt(
        passwordDB,
        process.env.PASSWORD_CRYPT!,
      ).toString(CryptoJS.enc.Utf8);
      const isPasswordValid = decryptPassword === password;
      const isEmailValid =
        emailDB.toLocaleLowerCase() === emailDB.toLocaleLowerCase();

      if (!isEmailValid || !isPasswordValid) {
        return res.status(400).json({ message: 'Check your email/password' });
      }

      res.status(200).json({ message: 'Code send' });
    } catch (error) {
      logger.error(
        'Error in AuthController in loginCode',
        `${JSON.stringify(error)}`,
      );
      return res.status(500).json({ message: 'Server error' });
    }
  }
  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = (req as MyRequest).cookies.refreshToken;

      if (typeof refreshToken !== 'string') {
        return res.status(400).json({ message: 'Log in again' });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as Secret,
        (error, user) => {
          if (error) {
            res.clearCookie('refreshToken');
            return res.status(400).json({ message: 'Log in again' });
          }

          const { id, email } = user as JwtPayload;

          const { refreshToken, accessToken } = jwtGenerate(id, email);

          res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          res.status(200).json({ message: accessToken });
        },
      );
    } catch (error) {
      logger.error(
        'Error in AuthController in refresh',
        `${JSON.stringify(error)}`,
      );
      return res.status(500).json({ message: 'Server error' });
    }
  }
  async logout(req: Request, res: Response) {
    try {
      res.clearCookie('refreshToken');
      return res.status(200).json({ message: 'You logout' });
    } catch (error) {
      logger.error(
        'Error in AuthController in logout',
        `${JSON.stringify(error)}`,
      );
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

const authController = new AuthController();

export default authController;
