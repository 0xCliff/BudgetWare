import { Store, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { usersApi } from './apis/usersApi';
import { transactionsApi } from './apis/transactionsApi';
import { authApi } from './apis/authApi';

export const store: Store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(usersApi.middleware, transactionsApi.middleware, authApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchUserQuery } from './apis/usersApi';
export {
  useFetchTransactionsQuery,
  useGetTransactionsByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} from './apis/transactionsApi';
export { useSignoutMutation, useLoginMutation, useRegisterMutation } from './apis/authApi';
