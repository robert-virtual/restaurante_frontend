import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICredentials{
  email: string;
  password: string;
}
export interface ISecurityState {
  name: string;
  email: string;
  avatar: string;
  token: string;
  _id: string;
}

const initialState: ISecurityState = {
  name: "",
  email: "",
  avatar: "",
  token: "",
  _id: "",
};

export const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setSecurityData: (state, action: PayloadAction<ISecurityState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.token = action.payload.token;
      state._id = action.payload._id;
    },
    resetSecurityData: (state) => {
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.token = "";
      state._id = "";
    },
  },
});

export const {  setSecurityData, resetSecurityData  } = securitySlice.actions;
export const selectAuth = (state: RootState) => state.security;
export default securitySlice.reducer;
