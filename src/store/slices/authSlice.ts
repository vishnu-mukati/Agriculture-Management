import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, UserData } from "../../types/auth"
const initialState : AuthState ={
    user : null,
    token : localStorage.getItem('token'),
    isLogin : !!localStorage.getItem('token'),
    // refreshToken : localStorage.getItem('refreshToken'),
}

const AuthSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        Login : (state,action : PayloadAction<{user : UserData,token : string, isLogin : boolean}>)=>{
            const { user , token, isLogin } = action.payload;
            state.user = user;
            state.token = token;
            state.isLogin = isLogin;
            localStorage.setItem('token',token);
        },
        Logout : (state) =>{
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            state.isLogin = false;
        }
    }
});

export const { Login , Logout } = AuthSlice.actions;
export default AuthSlice.reducer;

export const selectCurrentUser = (state : {auth : AuthState}) => state.auth.user;
export const selectCurrentToken = (state : {auth : AuthState}) => state.auth.token;
