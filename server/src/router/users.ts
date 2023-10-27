import { Router } from 'express';

import { deleteUser, getAllUsers, getUserByToken, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: Router) => {
  router.get('/api/v1/users', isAuthenticated, getAllUsers);
  router.get('/api/v1/users/:sessionToken', isAuthenticated, getUserByToken);
  router.delete('/api/v1/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/api/v1/users/:id', isAuthenticated, isOwner, updateUser);
};
