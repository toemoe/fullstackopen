import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const allUsersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = allUsersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers();
    dispatch(setUsers(users));
  };
};

export default allUsersSlice.reducer;
