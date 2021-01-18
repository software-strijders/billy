import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inEditMode: false,
  articleTitle: "",
  articleContent: "",
};

export const { actions, reducer } = createSlice({
  name: "editMode",
  initialState,
  reducers: {
    articleToEdit: (state, action) => {
      return action.payload;
    },
  },
});
