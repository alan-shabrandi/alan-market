import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Cookies from "js-cookie";
import RingLoader from "react-spinners/RingLoader";

import { userActions } from "../redux/reducers/user";

const Logout = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(userActions.logout());
    router.push("/");
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
  }, [dispatch, router]);

  return <RingLoader size={60} />;
};

export default Logout;
