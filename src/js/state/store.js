import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as login } from "./login.js";
import { reducer as related } from "./article-related.js";

export const store = configureStore({
  reducer: combineReducers({
    login: login,
    related: related,
  }),
});
