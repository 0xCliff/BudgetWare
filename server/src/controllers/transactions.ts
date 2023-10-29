import { Request, Response } from 'express';

import {
  createCategory,
  createTransaction,
  deleteTransactionById,
  getCategory,
  getTransactionById,
  getUserById,
  updateTransactionById,
} from '../db';

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

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;

    const transaction = await getTransactionById(transactionId);

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const createNewTransaction = async (req: Request, res: Response) => {
  try {
    const { name, category, price, date } = req.body;
    const { userId } = req.params;

    if (!userId || !name || !category || !price || !date) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return res.sendStatus(400);
    }

    // let newCategory = await getCategory(category);

    // if (!newCategory) {
    //   newCategory = await createCategory({ category });
    // }

    const newTransaction = await createTransaction({
      user: userId,
      name,
      date,
      category,
      price,
    });

    // newCategory.transactions.push(newTransaction._id);
    // await newCategory.save();

    existingUser.transactions.push(newTransaction);
    await existingUser.save();

    return res.status(200).json(newTransaction).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { name, category, price, date } = req.body;
    const { userId, transactionId } = req.params;

    if (!userId || !name || !category || !price || !date) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return res.sendStatus(400);
    }

    await updateTransactionById(transactionId, {
      user: userId,
      name,
      date,
      category,
      price,
    });

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;

    const deletedTransaction = await deleteTransactionById(transactionId);

    res.status(200).send(deletedTransaction);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
