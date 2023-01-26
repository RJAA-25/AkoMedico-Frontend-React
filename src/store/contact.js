import { createSlice } from "@reduxjs/toolkit";

const contactState = {
  data: [],
  isChanged: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState: contactState,
  reducers: {
    set(state, action) {
      state.data = action.payload;
      state.isChanged = true;
    },
    reset(state) {
      state.data = [];
      state.isChanged = false;
    },
  },
});

export const contactActions = contactSlice.actions;

export default contactSlice.reducer;
