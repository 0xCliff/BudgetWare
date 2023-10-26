import { Request, Response } from 'express';

import { createUser, getUserByEmail } from '../db';
import { authentication, random } from '../helpers';
import cookieParser from 'cookie-parser';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
        sessionToken: authentication(salt, [username, email].join('/')),
      },
    });

    res.cookie('AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password +authentication.sessionToken'
    );

    if (!user) {
      return res.sendStatus(403);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    res.cookie('AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

export const signOut = (req: Request, res: Response) => {
  try {
    res.clearCookie('AUTH', { domain: 'localhost', path: '/' });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
