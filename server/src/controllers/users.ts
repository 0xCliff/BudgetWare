import { Request, Response } from 'express';

import { deleteUserById, getUserById, getUserBySessionToken, getUsers } from '../db';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    res.sendStatus(400);
  }

  const user = await getUserById(id);

  user.username = username;
  await user.save();

  return res.status(200).json(user).end();
};

export const getUserByToken = async (req: Request, res: Response) => {
  try {
    const { sessionToken } = req.params;

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.sendStatus(403);
    }

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
