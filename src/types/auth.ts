import { DirectionsRailwayFilledOutlined, DownloadForOffline, FloodTwoTone, Folder, Javascript, RestartAlt, TheaterComedy } from "@mui/icons-material";
import { SliderValueLabel } from "@mui/material";
import { internal_createExtendSxProp } from "@mui/material/zero-styled";
import { UNSAFE_useFogOFWarDiscovery } from "react-router-dom";


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

export interface LoginPayload {
  user: { email: string ,password: string, returnSecureToken:boolean }; // add other user fields if needed
  token: string;
  isLogin: boolean;
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
  fieldName: string;
  fieldArea: number;
}

export interface firebaseData {
  fieldsData: fieldsListDataState;
}

export interface firebaseDataResponse {
  name: string;
}

export interface getfieldData {
  id: string;
  fieldName: string;
  fieldArea: number;
}

export interface editfieldData {
  fieldName : string,
  fieldArea : number,
  id : string,
}

export interface fieldsListDataState {
  fieldsListData: getfieldData[];
    editDataList : editfieldData | null;
}

export interface firebaseGetDataResponse {
  [key: string]: {
    fieldName: string;
    fieldArea: number;
    id: string;
  };
}
