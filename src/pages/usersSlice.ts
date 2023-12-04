import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/redux/store";
import { usersApi } from "./usersApi";
import { User } from "./types";

const initialState: { users: User[] | null } = {
  users: null
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
});

export const usersReducer = usersSlice.reducer;
export const usersSelector = (state: RootState) => state.users;
