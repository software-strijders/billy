import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as login } from "./login.js";

export const store = configureStore({
  reducer: combineReducers({
    login: login,
  }),
});
