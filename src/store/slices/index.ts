import { configureStore } from "@reduxjs/toolkit";
import  authReducer from "./authSlice";
import listReducer from "./fieldsListSlice"

export const store = configureStore({
    reducer : {auth : authReducer,list : listReducer}
});

export type RootState = ReturnType<typeof store.getState>;