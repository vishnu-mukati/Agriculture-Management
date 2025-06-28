import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import listReducer from "./fieldsListSlice";
import workListReducer from "./fieldWorkSlice";

export const store = configureStore({
  reducer: { auth: authReducer, list: listReducer, work: workListReducer },
});

export type RootState = ReturnType<typeof store.getState>;
