import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICredentials } from './interfaces';

// Define a service using a base URL and expected endpoints
export const databraryApi = createApi({
  reducerPath: 'databraryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://nyu.databrary.org/api/',
    mode: 'no-cors',
    // credentials: "same-origin",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, ICredentials>({
      query: (payload) => ({
        url: `user/login`,
        method: 'POST',
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: { ...payload },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = databraryApi;
