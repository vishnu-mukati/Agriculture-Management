import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginPayload, UserData } from "../../types/auth";
const initialState: AuthState = {
  user: localStorage.getItem("email")
    ? {
        email: localStorage.getItem("email") || "",
        password: "",
        returnSecureToken: true,
      }
    : null,
  token: localStorage.getItem("token"),
  isLogin: !!localStorage.getItem("token"),
  // refreshToken : localStorage.getItem('refreshToken'),
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action: PayloadAction<LoginPayload>) => {
      const { user, token, isLogin } = action.payload;
      // state.user   = user;
      if (user) {
        state.user = {
          ...user,
          email: user.email.replace(/[@.]/g, "_"),
        };
      } else {
        state.user = null;
      }

      state.token = token;
      state.isLogin = isLogin;
      localStorage.setItem("token", token);
      localStorage.setItem("email", user.email.replace(/[@.]/g, "_"));
    },
    Logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.isLogin = false;
    },
  },
});

export const { Login, Logout } = AuthSlice.actions;
export default AuthSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
