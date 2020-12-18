import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: {
    email: "",
    firstName: "",
    secondName: "",
    role: "",
    university: "",
  },
};

export const { actions, reducer } = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload); //should be removed but should be there for demonstration purposes ~xander vedder 2020
      return action.payload;
    },
  },
});
