import { Router } from 'express';

import { deleteUser, getAllUsers } from '../controllers/users';
import { isAuthenticated, isOwner, updateUser } from '../middlewares';

export default (router: Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
