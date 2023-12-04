import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserPost } from "./types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  // tagTypes: ["USERS", "POSTS"], // this should work if the changes are saved in the db
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users"
      // providesTags: ["USERS"]
    }),
    getUser: builder.query<User, number>({
      query: (userId) => `/users/${userId}`
      // providesTags: ["USERS"]
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body
      })
      // invalidatesTags: ["USERS"]
    }),
    getUserPosts: builder.query<UserPost[], number>({
      query: (userId) => ({
        url: "/posts",
        params: { userId }
      })
      // providesTags: ["POSTS"]
    }),
    updatePost: builder.mutation<UserPost, Partial<UserPost>>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body
      })
      // invalidatesTags: ["POSTS"]
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE"
      })
    })
    // invalidatesTags: ["POSTS"]
  })
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserPostsQuery,
  useGetUserQuery,
  useUpdatePostMutation,
  useDeletePostMutation
} = usersApi;
export const usersApiReducer = usersApi.reducer;
export const usersApiMiddleware = usersApi.middleware;
