import { Router } from 'express';

import { deleteUser, getAllUsers } from '../controllers/users';
import { isAuthenticated, isOwner, updateUser } from '../middlewares';

export default (router: Router) => {
  router.get('/api/v1/users', isAuthenticated, getAllUsers);
  router.delete('/api/v1/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/api/v1/users/:id', isAuthenticated, isOwner, updateUser);
};
