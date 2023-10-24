import { Request, Response } from 'express';

import { deleteUserById, getUserBySessionToken, getUsers } from '../db';

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
