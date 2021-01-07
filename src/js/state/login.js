import { createSelector, createSlice } from "@reduxjs/toolkit";

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
      return action.payload;
    },
  },
});

export const fullName = createSelector(
  (state) => `${state.login.user.firstName} ${state.login.user.lastName}`,
  (name) => name,
);
