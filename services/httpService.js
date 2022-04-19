import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.headers.post["Content-Type"] = "application/json";

if (typeof window !== "undefined") {
  let userInfo = Cookies.get("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
    axios.defaults.headers.common["authorization"] = `Bearer ${userInfo.token}`;
  }
}

axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    // toast_error("مشکلی از سمت سرور رخ داده است", 6000);
  }
  return Promise.reject(error);
});

// eslint-disable-next-line
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
