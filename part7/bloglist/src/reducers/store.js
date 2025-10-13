import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import anecdoteSlice from "./anecdoteSlice";
import userSlice from "./userSlice";
import allUsersSlice from "./allUsersSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    anecdotes: anecdoteSlice,
    user: userSlice,
    users: allUsersSlice,
  },
});

export default store;
