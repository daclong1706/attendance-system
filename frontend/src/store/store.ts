import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import userReducer from "./slices/userReducer";
import classReducer from "./slices/classReducer";
import subjectReducer from "./slices/subjectReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    class: classReducer,
    subject: subjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
