import { getError } from "../../utils/error";
import { userActions } from "../reducers/user";
import http from "../../services/httpService";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchUsers = async (dispatch) => {
  try {
    dispatch(userActions.fetchRequest());
    const { data } = await http.get(`/api/admin/users`);
    dispatch(userActions.fetchSuccess(data));
  } catch (error) {
    dispatch(userActions.fetchFail(getError(error)));
  }
};

export const deleteUserHandler = async (
  dispatch,
  userId,
  token,
  enqueueSnackbar,
  fetchUsers
) => {
  try {
    dispatch(userActions.deleteRequest());
    await http.delete(`/api/admin/users/${userId}`);
    enqueueSnackbar("کاربر با موفقیت حذف شد", { variant: "success" });
    dispatch(userActions.deleteSuccess());
    fetchUsers(dispatch, token);
  } catch (err) {
    enqueueSnackbar(getError(err), { variant: "error" });
    dispatch(userActions.deleteFail());
  }
};

export const updateUserHandler = async (
  dispatch,
  userId,
  values,
  closeSnackbar,
  enqueueSnackbar,
  router
) => {
  closeSnackbar();
  try {
    dispatch(userActions.updateLoading());
    await http.put(`/api/admin/users/${userId}`, values);
    enqueueSnackbar("اطلاعات کاربر با موفقیت ویرایش شد", {
      variant: "success",
    });
    router.push("/admin/users");
    dispatch(userActions.updateSuccess());
  } catch (error) {
    dispatch(userActions.updateFail(getError(error)));
    enqueueSnackbar(getError(error), { variant: "error" });
  }
};

export const updateUserInfoHandler = async (
  values,
  dispatch,
  closeSnackbar,
  enqueueSnackbar
) => {
  closeSnackbar();

  try {
    dispatch(userActions.updateUserLoading());
    const { data } = await http.put("/api/users/profile", values);
    dispatch(userActions.updateUserSuccess(data));
    Cookies.set("userInfo", data);
    enqueueSnackbar("اطلاعات شما با موفقیت تغییر کرد", {
      variant: "success",
    });
  } catch (error) {
    dispatch(userActions.updateUserFail(getError(error)));
    enqueueSnackbar(getError(error), { variant: "error" });
  }
};

export const registerHandler = async (
  values,
  dispatch,
  redirect,
  closeSnackbar,
  enqueueSnackbar,
  router
) => {
  closeSnackbar();
  try {
    dispatch(userActions.registerRequest());
    const { data } = await http.post("/api/users/register", values);
    Cookies.set("userInfo", data);
    dispatch(userActions.registerSuccess(data));
    router.push(redirect || "/");
    enqueueSnackbar("ثبت نام با موفقیت انجام شد", { variant: "success" });
    axios.defaults.headers.common["authorization"] = `Bearer ${data.token}`;
  } catch (error) {
    dispatch(userActions.registerFail(getError(error)));
    enqueueSnackbar(getError(error), { variant: "error" });
  }
};

export const loginHandler = async (
  values,
  dispatch,
  redirect,
  closeSnackbar,
  enqueueSnackbar,
  router
) => {
  closeSnackbar();
  try {
    dispatch(userActions.loginRequest());

    const { data } = await http.post("/api/users/login", values);
    Cookies.set("userInfo", data);
    dispatch(userActions.loginSuccess(data));
    router.push(redirect || "/");
    enqueueSnackbar("ورود با موفقیت انجام شد", { variant: "success" });
    axios.defaults.headers.common["authorization"] = `Bearer ${data.token}`;
  } catch (error) {
    dispatch(userActions.loginFail(getError(error)));
    enqueueSnackbar(getError(error), { variant: "error" });
  }
};
