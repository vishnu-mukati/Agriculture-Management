import { createSlice } from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";
import type { fieldsListDataState, fieldsData } from "../../types/auth";

const initialState : fieldsListDataState = {
   fieldsListData : [],
};

const fieldsListSlice = createSlice({
    name : "fieldsListData",
    initialState,
    reducers : {
       addToList : (state,action : PayloadAction<{fieldsName : string, fieldsArea : number}>)=>{
            state.fieldsListData.push({
        fieldsName: action.payload.fieldsName,
        fieldsArea: action.payload.fieldsArea,
      });
       },
       removeFromList : (state, action : PayloadAction<{}>)=>{}
    }
})


export const { addToList, removeFromList } = fieldsListSlice.actions;
export default fieldsListSlice.reducer;