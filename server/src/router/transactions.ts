import { Router } from 'express';

import { isAuthenticated } from '../middlewares';
import { createNewTransaction, getAllTransactions } from '../controllers/transactions';

export default (router: Router) => {
  router.get('/api/v1/:userId/transactions', isAuthenticated, getAllTransactions);
  router.post('/api/v1/:userId/transactions', isAuthenticated, createNewTransaction);
};
