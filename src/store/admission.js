import { createSlice } from "@reduxjs/toolkit";

const admissionState = {
  data: [],
  isChanged: false,
};

const admissionSlice = createSlice({
  name: "admission",
  initialState: admissionState,
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

export const admissionActions = admissionSlice.actions;

export default admissionSlice.reducer;
