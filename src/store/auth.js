import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../helpers/utilities";

const authState = {
  // isAuthenticated: getCookie("CSRF-TOKEN") ? true : false,
  isAuthenticated: getCookie("access_token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
