import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  orders: [],
  error: "",
  loadingDelete: false,
  successDelete: false,
  failDelete: false,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
    shippingAddress: Cookies.get("shippingAddress")
      ? JSON.parse(Cookies.get("shippingAddress"))
      : {},
    paymentMethod: Cookies.get("paymentMethod")
      ? Cookies.get("paymentMethod")
      : "",
  },
  order: {},
  loadingPay: false,
  successPay: false,
  errorPay: "",
  loadingDeliver: false,
  successDeliver: false,
  errorDeliver: false,
};

const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchRequest(state) {
      state.loading = true;
      state.error = "";
      state.orders = [];
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.error = "";
      state.orders = action.payload;
    },
    fetchFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.orders = [];
    },
    addToCardSuccess(state, action) {
      state.cart = { ...state.cart, cartItems: action.payload };
    },
    addToCardFail(state, action) {
      state.error = action.payload;
    },
    removeItem(state, action) {
      state.cart = { ...state.cart, cartItems: action.payload };
    },
    saveShippingAddress(state, action) {
      state.cart = { ...state.cart, shippingAddress: action.payload };
    },
    savePaymentMethod(state, action) {
      state.cart = { ...state.cart, paymentMethod: action.payload };
    },
    fetchOrderLoading(state) {
      state.loading = true;
      state.error = "";
    },
    fetchOrderSuccess(state, action) {
      state.loading = false;
      state.error = "";
      state.order = action.payload;
    },
    fetchOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    payOrderRequest(state) {
      state.loadingPay = true;
    },
    payOrderSuccess(state) {
      state.loadingPay = false;
      state.successPay = true;
    },
    payOrderFail(state, action) {
      state.loadingPay = false;
      state.error = action.payload;
    },
    payReset(state) {
      state.loadingPay = false;
      state.successPay = false;
      state.error = "";
    },
    deliverOrderRequest(state) {
      state.loadingDeliver = true;
    },
    deliverOrderSuccess(state) {
      state.loadingDeliver = false;
      state.successDeliver = true;
    },
    deliverOrderFail(state, action) {
      state.loadingDeliver = false;
      state.error = action.payload;
    },
    deliverReset(state) {
      state.loadingDeliver = false;
      state.successDelloadingDeliver = false;
      state.error = "";
    },
  },
});

export const orderActions = orderReducer.actions;

export default orderReducer;
