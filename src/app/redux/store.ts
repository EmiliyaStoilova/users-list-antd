import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../../pages/usersApi";
import { usersReducer, usersSlice } from "../../pages/usersSlice";

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
