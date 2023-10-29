import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const transactionsApi = createApi({
  reducerPath: 'transaction',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1',
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  tagTypes: ['transaction'],
  endpoints(builder) {
    return {
      fetchTransactions: builder.query<Transaction[], string>({
        providesTags: ['transaction'],
        query: (id) => {
          return {
            url: `/${id}/transactions`,
            credentials: 'include',
            method: 'GET',
          };
        },
      }),
      getTransactionsById: builder.query<Transaction, string>({
        query: (id: string) => {
          return {
            url: `/transactions/${id}`,
            credentials: 'include',
            method: 'GET',
          };
        },
      }),
      createTransaction: builder.mutation<Transaction, Omit<Transaction, '_id'>>({
        invalidatesTags: ['transaction'],
        query: ({ name, category, price, date, userId }) => {
          return {
            url: `/${userId}/transactions`,
            credentials: 'include',
            method: 'POST',
            body: {
              name,
              category,
              price,
              date,
              userId,
            },
          };
        },
      }),
      updateTransaction: builder.mutation({
        invalidatesTags: ['transaction'],
        query: ({ name, category, price, date, userId, transactionId }) => {
          return {
            url: `/user/${userId}/transaction/${transactionId}`,
            credentials: 'include',
            method: 'PATCH',
            body: {
              name,
              category,
              price,
              date,
              userId,
            },
          };
        },
      }),
      deleteTransaction: builder.mutation<Transaction, any>({
        invalidatesTags: ['transaction'],
        query: ({ userId, id }) => {
          return {
            url: `/user/${userId}/transaction/${id}`,
            credentials: 'include',
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useFetchTransactionsQuery,
  useGetTransactionsByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
export { transactionsApi };
