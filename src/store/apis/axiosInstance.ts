import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  fieldsData,
  firebaseDataResponse,
  firebaseGetDataResponse,
  firebaseWorkDataResponse,
  reset,
  ResetResponse,
  SignInResponse,
  SignUpResponse,
  UserData,
  workData,
} from "../../types/auth";

const baseURL: string = "https://identitytoolkit.googleapis.com/v1/accounts";
const Api_Key: string = "AIzaSyCxGGT5Nvo0AFdv4kmlggIrc314kF_yX3o";
const api = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const firebaseDbURL: string =
  "https://agriculture-management-d00e5-default-rtdb.firebaseio.com/";
const firebaseDbApi = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  signIn: (userdata: UserData): Promise<AxiosResponse<SignInResponse>> => {
    return api.post(`${baseURL}:signInWithPassword?key=${Api_Key}`, userdata);
  },
  signUp: (userdata: UserData): Promise<AxiosResponse<SignUpResponse>> => {
    return api.post(`${baseURL}:signUp?key=${Api_Key}`, userdata);
  },
  forgotPassword : (passwordData : reset) : Promise<AxiosResponse<ResetResponse>> => {
    return api.post(`${baseURL}:sendOobCode?key=${Api_Key}`, passwordData);
  }
};

export const dataApi = {
  firebaseListStore: (
    data: fieldsData,
    userEmail: string | null
  ): Promise<AxiosResponse<firebaseDataResponse>> => {
    return firebaseDbApi.post(
      `${firebaseDbURL}/fieldList/${userEmail}.json`,
      data
    );
  },
  firebaseListGet: (
    userEmail: string | null
  ): Promise<AxiosResponse<firebaseGetDataResponse>> => {
    return firebaseDbApi.get(`${firebaseDbURL}/fieldList/${userEmail}.json`);
  },
};

export const deleteApi = {
  firebaseDeleteData: (userEmail: string | null, id: string) => {
    return firebaseDbApi.delete(
      `${firebaseDbURL}/fieldList/${userEmail}/${id}.json`
    );
  },
};

export const editApi = {
  firebaseEditData: (
    userEmail: string | null,
    id: string,
    editData: { fieldName: string; fieldArea: number }
  ) => {
    return firebaseDbApi.patch(
      `${firebaseDbURL}/fieldList/${userEmail}/${id}.json`,
      editData
    );
  },
};

export const workListApi = {
  firebaseWorkData: (
    userEmail: string | null,
    id: string | undefined,
    workData: workData,
  ) : Promise<AxiosResponse<firebaseDataResponse>>=>  {
    return firebaseDbApi.post(
      `${firebaseDbURL}/workList/${userEmail}/${id}.json`,
      workData
    );
  },
    firebaseListGet: (
    userEmail: string | null,
    id : string|undefined,
  ): Promise<AxiosResponse<firebaseWorkDataResponse>> => {
    return firebaseDbApi.get(`${firebaseDbURL}/workList/${userEmail}/${id}.json`);
  },
};

export default api;
