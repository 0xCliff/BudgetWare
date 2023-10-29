import { Request, Response, NextFunction } from 'express';

import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies['AUTH'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== userId) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
