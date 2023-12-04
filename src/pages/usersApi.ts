import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  // tagTypes: ["USERS"], // this should work if the changes are saved in the db
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users"
      // providesTags: ["USERS"]
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body
      })
      // invalidatesTags: ["USERS"]
    })
  })
});

export const { useGetUsersQuery, useUpdateUserMutation } = usersApi;
export const usersApiReducer = usersApi.reducer;
export const usersApiMiddleware = usersApi.middleware;
