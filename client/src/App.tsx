import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Layout from './pages/Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Logged in</div>,
  },
  {
    path: '/settings',
    element: <div>Settings</div>,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
