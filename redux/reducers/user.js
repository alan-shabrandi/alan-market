import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  loadingAuth: false,
  users: [],
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
  error: "",
  loadingDelete: false,
  successDelete: false,
  failDelete: false,
  loadingUpdate: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerRequest(state) {
      state.loadingAuth = true;
    },
    registerSuccess(state, action) {
      state.loadingAuth = false;
      state.userInfo = action.payload;
    },
    registerFail(state, action) {
      state.loadingAuth = false;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loadingAuth = true;
    },
    loginSuccess(state, action) {
      state.loadingAuth = false;
      state.userInfo = action.payload;
    },
    loginFail(state, action) {
      state.loadingAuth = false;
      state.error = action.payload;
    },
    fetchRequest(state) {
      state.loading = true;
      state.error = "";
      state.users = [];
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.error = "";
      state.users = action.payload;
    },
    fetchFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.users = [];
    },
    deleteRequest(state) {
      state.loadingDelete = true;
      state.successDelete = false;
      state.failDelete = false;
    },
    deleteSuccess(state) {
      state.loadingDelete = false;
      state.successDelete = true;
      state.failDelete = false;
    },
    deleteFail(state) {
      state.loadingDelete = false;
      state.successDelete = false;
      state.failDelete = true;
    },
    updateLoading(state) {
      state.loadingUpdate = true;
      state.error = "";
    },
    updateSuccess(state) {
      state.loadingUpdate = false;
      state.error = "";
    },
    updateFail(state, action) {
      state.loadingUpdate = false;
      state.error = action.payload;
    },
    updateUserLoading(state) {
      state.loadingUpdate = true;
    },
    updateUserSuccess(state, action) {
      state.loadingUpdate = false;
      state.userInfo = action.payload;
    },
    updateUserFail(state, action) {
      state.loadingUpdate = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userInfo = null;
    },
  },
});

export const userActions = userReducer.actions;

export default userReducer;
