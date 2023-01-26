import { createSlice } from "@reduxjs/toolkit";

const doctorState = {
  data: [],
  isChanged: false,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState: doctorState,
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

export const doctorActions = doctorSlice.actions;

export default doctorSlice.reducer;
