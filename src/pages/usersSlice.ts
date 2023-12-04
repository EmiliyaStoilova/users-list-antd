import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/redux/store";
import { usersApi } from "./usersApi";
import { User, UserPost } from "./types";

const initialState: { users: User[] | null; posts: UserPost[] | null } = {
  users: null,
  posts: null
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addMatcher(usersApi.endpoints.getUsers.matchFulfilled, (state, { payload }) => {
        state.users = payload;
      })
      .addMatcher(usersApi.endpoints.updateUser.matchFulfilled, (state, { payload }) => {
        const { id } = payload;
        const users = state.users;

        if (users) {
          const updatedUser = users.find((user) => user.id === id);

          if (updatedUser) {
            users[users.indexOf(updatedUser)] = payload;
          }
        }
      })
      .addMatcher(usersApi.endpoints.getUserPosts.matchFulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addMatcher(usersApi.endpoints.updatePost.matchFulfilled, (state, { payload }) => {
        const { id } = payload;
        const posts = state.posts;

        if (posts) {
          const updatedPost = posts.find((post) => post.id === id);

          if (updatedPost) {
            posts[posts.indexOf(updatedPost)] = payload;
          }
        }
      })
});

export const usersReducer = usersSlice.reducer;
export const usersSelector = (state: RootState) => state.users;
