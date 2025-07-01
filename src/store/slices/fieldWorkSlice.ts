import { createSlice } from "@reduxjs/toolkit";
import type {  workDataListState } from "../../types/auth";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { getWorkData } from "../../types/auth";
const initialState: workDataListState = {
  workList: [],
};

const workListSlice = createSlice({
  name: "workListData",
  initialState,
  reducers: {
    addToWorkList: (state, action: PayloadAction<getWorkData[]>) => {
      state.workList = action.payload.reverse();
    },
    addWorkToTop: (state, action: PayloadAction<getWorkData>) => {
      state.workList.unshift(action.payload);
    },
    removeWorkList: (state) => {
      state.workList = [];
    },
  },
});

export const { addToWorkList, addWorkToTop, removeWorkList} =
  workListSlice.actions;
export default workListSlice.reducer;
