import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: {
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    link: "",
    organization: "",
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

export const author = createSelector(
  (state) => ({
    fullName: `${state.login.user.firstName} ${state.login.user.lastName}`,
    organization: state.login.user.organization,
    link: state.login.user.link,
  }),
  (name) => name,
);
