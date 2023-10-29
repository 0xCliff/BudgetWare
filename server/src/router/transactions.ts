import { Router } from 'express';

import { isAuthenticated, isOwner } from '../middlewares';
import {
  createNewTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
} from '../controllers/transactions';

export default (router: Router) => {
  router.get('/api/v1/:userId/transactions', isAuthenticated, getAllTransactions);
  router.get('/api/v1/transactions/:transactionId', isAuthenticated, getTransaction);
  router.post('/api/v1/:userId/transactions', isAuthenticated, createNewTransaction);
  router.patch('/api/v1/user/:userId/transaction/:transactionId', isAuthenticated, isOwner, updateTransaction);
  router.delete('/api/v1/user/:userId/transaction/:transactionId', isAuthenticated, isOwner, deleteTransaction);
};
