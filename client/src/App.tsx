import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Settings from './pages/Settings';

const queryClient = new QueryClient();
const router = createBrowserRouter([
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
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
