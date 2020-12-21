import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: {
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    link: "",
  },
};

export const { actions, reducer } = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload); //should be removed but its temporarily here for demonstration purposes
      return action.payload;
    },
  },
});
