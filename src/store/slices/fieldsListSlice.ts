import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { fieldsListDataState, getfieldData } from "../../types/auth";

const initialState: fieldsListDataState = {
  fieldsListData: [],
};

const fieldsListSlice = createSlice({
  name: "fieldsListData",
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<getfieldData[]>) => {
      state.fieldsListData = action.payload.reverse();
    },
      addFieldToTop: (state, action: PayloadAction<getfieldData>) => {
      state.fieldsListData.unshift(action.payload);
      },
    removeFromList: (state) => {
      state.fieldsListData = [];
    },
    deleteDataList : (state,action:PayloadAction<string>)=>{
      const listdata = state.fieldsListData.filter((item)=>item.id!==action.payload)
      state.fieldsListData = listdata;
    }
  },
});

export const { addToList, addFieldToTop, removeFromList, deleteDataList } = fieldsListSlice.actions;
export default fieldsListSlice.reducer;
