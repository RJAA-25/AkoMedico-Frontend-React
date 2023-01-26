import { createSlice } from "@reduxjs/toolkit";

const conditionState = {
  data: [],
  isChanged: false,
};

const conditionSlice = createSlice({
  name: "condition",
  initialState: conditionState,
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

export const conditionActions = conditionSlice.actions;

export default conditionSlice.reducer;
