

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
   idToken : string,
   email : string,
   refreshToken : string,
   expiresIn : string,
   registered : boolean,
} 

export interface SignUpResponse {
    email : string,
    idToken : string,
    expireIn : string,
    RefreshToken : string,

}