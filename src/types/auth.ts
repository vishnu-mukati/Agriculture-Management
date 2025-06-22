export interface UserData {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface AuthState {
  user: UserData | null;
  token: string | null;
  isLogin: Boolean;
}

// export interface RootState {
//   auth : AuthState;
// }

export interface SignInResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  registered: boolean;
}

export interface SignUpResponse {
  email: string;
  idToken: string;
  expiresIn: string;
  refreshToken: string;
}

export interface fieldsData {
  fieldName: string,
  fieldArea: number,
}

export interface fieldsListDataState {
    fieldsListData : fieldsData[],
}

export interface firebaseData {
  fieldsData: fieldsListDataState;
}

export interface firebaseDataResponse {
    name : string,
}

export interface firebaseGetDataResponse {
  [key : string] : {
    fieldName : string,
    fieldArea : number,
    id : string,
  }
}

