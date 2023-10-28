import { Request, Response } from 'express';

import { createCategory, createTransaction, getCategory, getUserById } from '../db';

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await getUserById(userId).populate('transactions').exec();

    return res.status(200).json(user.transactions);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const createNewTransaction = async (req: Request, res: Response) => {
  try {
    const { name, category, price } = req.body;
    const { userId } = req.params;

    if (!userId || !name || !category || !price) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return res.sendStatus(400);
    }

    let newCategory = await getCategory(category.name);

    if (!newCategory) {
      newCategory = await createCategory(category);
    }

    const newTransaction = await createTransaction({
      user: userId,
      name,
      date: Date.now(),
      category: newCategory.name,
      price,
    });

    newCategory.transactions.push(newTransaction._id);
    await newCategory.save();

    existingUser.transactions.push(newTransaction);
    await existingUser.save();

    return res.status(200).json(newTransaction).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
