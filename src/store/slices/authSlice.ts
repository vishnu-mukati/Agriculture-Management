import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, UserData } from "../../types/auth"
const initialState : AuthState ={
    user : null,
    token : localStorage.getItem('token'),
    isLogin : false,
    // refreshToken : localStorage.getItem('refreshToken'),
}

const AuthSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        Login : (state,action : PayloadAction<{user : UserData,token : string}>)=>{
            const { user , token } = action.payload;
            state.user = user;
            state.token = token;
            localStorage.setItem('token',token);
        },
        Logout : (state) =>{
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    }
});

export const { Login , Logout } = AuthSlice.actions;
export default AuthSlice.reducer;

export const selectCurrentUser = (state : {auth : AuthState}) => state.auth.user;
export const selectCurrentToken = (state : {auth : AuthState}) => state.auth.token;
