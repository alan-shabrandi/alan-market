import { getError } from "../../utils/error";
import { orderActions } from "../reducers/order";
import http from "../../services/httpService";
import Cookies from "js-cookie";

export const fetchOrder = async (dispatch, orderId) => {
  try {
    dispatch(orderActions.fetchOrderLoading());
    const { data } = await http.get(`/api/orders/${orderId}`);
    dispatch(orderActions.fetchOrderSuccess(data));
  } catch (error) {
    dispatch(orderActions.fetchOrderFail(getError(error)));
  }
};

export const fetchOrders = async (dispatch, userOrders) => {
  let address = "/api/admin/orders";
  if (userOrders) address = "/api/orders/history";
  try {
    dispatch(orderActions.fetchRequest());
    const { data } = await http.get(address);
    dispatch(orderActions.fetchSuccess(data));
  } catch (error) {
    dispatch(orderActions.fetchFail(getError(error)));
  }
};

export const addToCartHandler = async (
  product,
  dispatch,
  cartItems,
  closeSnackbar,
  enqueueSnackbar,
  router,
  setLoading
) => {
  closeSnackbar();
  setLoading(true);
  const existItem = cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  const { data } = await http.get(`/api/products/${product._id}`);
  if (data.countInStock < quantity) {
    setLoading(false);
    dispatch(orderActions.addToCardFail("این محصول در انبار موجود نیست"));
    return enqueueSnackbar("این محصول در انبار موجود نیست", {
      variant: "error",
    });
  }
  const newItem = { ...product, quantity };
  let newCartItems = [];
  if (existItem) {
    newCartItems = cartItems.map((item) =>
      item.name === existItem.name ? newItem : item
    );
  } else {
    newCartItems = [...cartItems, newItem];
  }

  Cookies.set("cartItems", newCartItems);
  dispatch(orderActions.addToCardSuccess(newCartItems));
  router.push("/cart");
  setLoading(false);
};

export const updateCartHandler = async (
  item,
  quantity,
  cartItems,
  dispatch,
  closeSnackbar,
  enqueueSnackbar
) => {
  closeSnackbar();
  const { data } = await http.get(`/api/products/${item._id}`);
  if (data.countInStock < quantity)
    return enqueueSnackbar("موجودی انبار تمام شده است", { variant: "error" });
  dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  const newItem = { ...item, quantity };
  let newCartItems = [];
  const existItem = cartItems.find((x) => x._id === item._id);
  newCartItems = cartItems.map((item) =>
    item.name === existItem.name ? newItem : item
  );
  Cookies.set("cartItems", newCartItems);
  dispatch(orderActions.addToCardSuccess(newCartItems));
};

export const removeItemHandler = (item, cartItems, dispatch) => {
  const newCartItems = cartItems.filter((x) => x._id !== item._id);
  Cookies.set("cartItems", newCartItems);
  dispatch(orderActions.removeItem(newCartItems));
};

export const submitShippingHandler = (values, dispatch, router, setLoading) => {
  setLoading(true);
  dispatch(orderActions.saveShippingAddress(values));
  Cookies.set("shippingAddress", values);
  router.push("/payment");
  setLoading(false);
};

export const submitPaymentMethodHandler = (
  event,
  paymentMethod,
  dispatch,
  setLoading,
  router,
  closeSnackbar,
  enqueueSnackbar
) => {
  closeSnackbar();
  setLoading(true);
  event.preventDefault();
  if (!paymentMethod) {
    setLoading(false);
    enqueueSnackbar("انتخاب شیوه پرداخت الزامی است", { variant: "error" });
  } else {
    dispatch(orderActions.savePaymentMethod(paymentMethod));
    Cookies.set("paymentMethod", paymentMethod);
    router.push("/placeorder");
  }
};

export const placeOrderHandler = async (
  orderDetails,
  dispatch,
  router,
  setLoading,
  closeSnackbar,
  enqueueSnackbar
) => {
  closeSnackbar();
  try {
    setLoading(true);
    const { data } = await http.post("/api/orders", orderDetails);
    dispatch({ type: "CART_CLEAR" });
    Cookies.remove("cartItems");
    router.push(`/order/${data._id}`);
  } catch (error) {
    setLoading(false);
    enqueueSnackbar(getError(error), { variant: "error" });
  }
};

export const payOrderHandler = async (dispatch, orderId, enqueueSnackbar) => {
  try {
    dispatch(orderActions.payOrderRequest());
    const { data } = await http.get(`/api/orders/${orderId}/pay`);
    dispatch(orderActions.payOrderSuccess());
    dispatch({ type: "PAY_SUCCESS", payload: data });
    enqueueSnackbar("پرداخت با موفقیت انجام شد", { variant: "success" });
  } catch (error) {
    dispatch(orderActions.payOrderFail(getError(error)));
    enqueueSnackbar(getError(error), { variant: "error" });
  }
};

export const deliverOrderHandler = async (
  orderId,
  dispatch,
  enqueueSnackbar
) => {
  try {
    dispatch(orderActions.deliverOrderRequest());
    await http.put(`/api/orders/${orderId}/deliver`, {});
    dispatch(orderActions.deliverOrderSuccess());
    enqueueSnackbar("ارسال با موفقیت انجام شد", { variant: "success" });
  } catch (error) {
    dispatch(orderActions.deliverOrderFail(getError(error)));
    enqueueSnackbar(getError(error), { variant: "error" });
  }
};
