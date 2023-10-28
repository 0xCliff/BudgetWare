import { createBrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/settings',
    element: (
      <Layout>
        <Settings />
      </Layout>
    ),
  },
  {
    path: '/transactions',
    element: (
      <Layout>
        <Transactions />
      </Layout>
    ),
  },
]);
