import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: {
    link: "hogeschool-utrecht",
  },
  date: "",
  links: [],
  edits: [],
};

export const { actions, reducer } = createSlice({
  name: "article-related-info",
  initialState,
  reducers: {
    setLinks: (state, action) => {
      return action.payload;
    },
  },
});
