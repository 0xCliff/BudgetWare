import { Router } from 'express';

import { isAuthenticated } from '../middlewares';
import { login, register, signOut } from '../controllers/authentication';

export default (router: Router) => {
  router.post('/api/v1/auth/register', register);
  router.post('/api/v1/auth/login', login);
  router.post('/api/v1/auth/signout', isAuthenticated, signOut);
};
