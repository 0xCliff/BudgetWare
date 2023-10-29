import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1',
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchUser: builder.query<User, string>({
        query: () => {
          return {
            url: `/users/${document.cookie.slice(5)}`,
            credentials: 'include',
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchUserQuery } = usersApi;
export { usersApi };
