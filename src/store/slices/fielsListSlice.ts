import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { fieldsListDataState, fieldsData } from "../../types/auth";

const initialState: fieldsListDataState = {
  fieldsListData: [],
};

const fieldsListSlice = createSlice({
  name: "fieldsListData",
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<fieldsData[]>) => {
      state.fieldsListData = action.payload;
    },
    removeFromList: (state) => {
      state.fieldsListData = [];
    },
  },
});

export const { addToList, removeFromList } = fieldsListSlice.actions;
export default fieldsListSlice.reducer;
