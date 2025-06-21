

export interface UserData {
    email : string ,
    password : string,
    returnSecureToken: boolean ,
}

export interface AuthState {
    user : UserData | null,
    token : string | null,
    isLogin : Boolean,
}

export interface SignInResponse {
    data : UserData,
   idToken : string,
   email : string,
   refreshToken : string,
   expiresIn : string,
   registered : boolean,
} 

export interface SignUpResponse {
    data : UserData,
    email : string,
    idToken : string,
    expireIn : string,
    RefreshToken : string,

}