import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://crazy-zoos-tickle.loca.lt/api/',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // GET all users
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['User'],
    }),

    // PUT update user role
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `users/${id}/role`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: ['User'],
    }),

    // POST login
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        body: { email, password },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useLoginUserMutation,
} = usersApi;
