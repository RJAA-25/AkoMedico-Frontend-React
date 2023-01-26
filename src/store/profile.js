import { createSlice } from "@reduxjs/toolkit";

const profileState1 = {
  data: {},
  isChanged: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: profileState,
  reducers: {
    set(state, action) {
      state.data = action.payload;
      state.isChanged = true;
    },
    reset(state) {
      state.data = {};
      state.isChanged = false;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
