import { Router } from 'express';

import authentication from './authentication';
import users from './users';
import transactions from './transactions';

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  transactions(router);

  return router;
};
