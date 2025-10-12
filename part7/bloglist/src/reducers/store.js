import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import anecdoteSlice from "./anecdoteSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    anecdotes: anecdoteSlice,
    user: userSlice,
  },
});

export default store;
