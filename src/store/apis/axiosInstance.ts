import axios from "axios";
import type { SignInResponse, SignUpResponse,  UserData } from "../../types/auth";

const baseURL : string = "https://identitytoolkit.googleapis.com/v1/accounts";
const Api_Key : string ="AIzaSyCxGGT5Nvo0AFdv4kmlggIrc314kF_yX3o";
const api   = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const authApi = {
signIn  : (data : UserData) : Promise<SignInResponse> =>{
     return api.post(`${baseURL}:signInWithPassword?key=${Api_Key}`,data);
},
signUp : (data : UserData) : Promise<SignUpResponse> => {
    return api.post(`${baseURL}:signUp?key=${Api_Key}`,data)
},

};

export default api;

