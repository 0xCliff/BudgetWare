import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './pages/Layout';
import Settings from './pages/Settings';
import Transactions from './pages/transactions/Transactions';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import TransactionShow from './pages/transactions/TransactionShow';
import NewTransactionForm from './components/transactions/NewTransactionForm';
import EditTransactionForm from './components/transactions/EditTransaction';
import Dashboard from './pages/Home';
import Home from './pages/Home';
import { store } from './store';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/settings', element: <Settings /> },
      { path: '/transaction', element: <Transactions /> },
      { path: '/transactions/new', element: <NewTransactionForm /> },
      {
        path: '/transactions/edit/:transactionId',
        element: <EditTransactionForm />,
      },
      { path: '/transactions/:transactionId', element: <TransactionShow /> },
      { path: '/profile/:userId', element: <Profile /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
