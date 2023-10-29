import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1',
    fetchFn: async (...args) => {
      return fetch(...args).finally(() => document.location.reload());
    },
  }),
  endpoints(builder) {
    return {
      signout: builder.mutation({
        query: () => {
          return {
            url: '/auth/signout',
            credentials: 'include',
            method: 'GET',
          };
        },
      }),
      login: builder.mutation<User, Partial<Credentials>>({
        query: ({ email, password }) => {
          return {
            url: '/auth/login',
            body: {
              email,
              password,
            },
            credentials: 'include',
            method: 'POST',
          };
        },
      }),
      register: builder.mutation<User, Credentials>({
        query: ({ username, email, password }) => {
          return {
            url: '/auth/register',
            body: {
              username,
              email,
              password,
            },
            credentials: 'include',
            method: 'POST',
          };
        },
      }),
    };
  },
});

export const { useSignoutMutation, useLoginMutation, useRegisterMutation } = authApi;
export { authApi };
