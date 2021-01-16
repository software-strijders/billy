import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as login } from "./login.js";
import { reducer as related } from "./article-related.js";
import { reducer as editMode } from "./edit-mode.js";

export const store = configureStore({
  reducer: combineReducers({
    login: login,
    related: related,
    editMode: editMode,
  }),
});
