import { createSlice } from "@reduxjs/toolkit";

const modalState = {
  content: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState: modalState,
  reducers: {
    set(state, action) {
      state.content = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
