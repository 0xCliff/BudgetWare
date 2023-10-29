import { createBrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';
import Settings from './pages/Settings';
import Transactions from './pages/transactions/Transactions';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import TransactionShow from './pages/transactions/TransactionShow';
import NewTransactionForm from './components/transactions/NewTransactionForm';
import EditTransactionForm from './components/transactions/EditTransaction';
import Dashboard from './pages/Home';

export const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <Layout>
        <Dashboard />
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
  {
    path: '/transactions/new',
    element: (
      <Layout>
        <NewTransactionForm />
      </Layout>
    ),
  },
  {
    path: '/transactions/edit/:transactionId',
    element: (
      <Layout>
        <EditTransactionForm />
      </Layout>
    ),
  },
  {
    path: '/transactions/:transactionId',
    element: (
      <Layout>
        <TransactionShow />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);
