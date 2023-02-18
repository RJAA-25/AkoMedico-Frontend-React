import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import userSlice from "./user";
import profileSlice from "./profile";
import contactSlice from "./contact";
import conditionSlice from "./condition";
import doctorSlice from "./doctor";
import admissionSlice from "./admission";
import consultationSlice from "./consultation";
import modalSlice from "./modal";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    profile: profileSlice,
    contact: contactSlice,
    condition: conditionSlice,
    doctor: doctorSlice,
    admission: admissionSlice,
    consultation: consultationSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["modal/set"],
        ignoredPaths: ["modal.content.action"],
      },
    }),
});
