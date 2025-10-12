import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import anecdoteSlice from "./anecdoteSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    anecdotes: anecdoteSlice,
  },
});

export default store;
