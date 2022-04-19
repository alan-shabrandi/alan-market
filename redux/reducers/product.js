import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  products: [],
  error: "",
  loadingCreate: false,
  successCreate: false,
  failCreate: "",
  loadingDelete: false,
  successDelete: false,
  loadingUpdate: false,
  failDelete: "",
  summary: { salesData: [] },
  uploadLoading: false,
  comments: [],
  rating: 0,
};

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchRequest(state) {
      state.loading = true;
      state.error = "";
      state.products = [];
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.error = "";
      state.products = action.payload;
    },
    fetchFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.products = [];
    },
    createRequest(state) {
      state.loadingCreate = true;
      state.successCreate = false;
      state.failCreate = "";
    },
    createSuccess(state) {
      state.loadingCreate = false;
      state.successCreate = true;
      state.failCreate = "";
    },
    createFail(state, action) {
      state.loadingCreate = false;
      state.successCreate = false;
      state.failCreate = action.payload;
    },
    deleteRequest(state) {
      state.loadingDelete = true;
      state.successDelete = false;
      state.failDelete = "";
    },
    deleteSuccess(state) {
      state.loadingDelete = false;
      state.successDelete = true;
      state.failDelete = "";
    },
    deleteFail(state) {
      state.loadingDelete = false;
      state.successDelete = false;
      state.failDelete = "";
    },
    loadingUpdate(state) {
      state.loadingUpdate = true;
    },
    successUpdate(state) {
      state.loadingUpdate = false;
    },
    failUpdate(state, action) {
      state.loadingUpdate = false;
      state.error = action.payload;
    },
    uploadImage(state) {
      state.uploadLoading = true;
    },
    uploadImageSuccess(state) {
      state.uploadLoading = false;
    },
    uploadImageFail(state, action) {
      state.uploadLoading = false;
      state.error = action.payload;
    },
    fetchSummarySuccess(state, action) {
      state.loading = false;
      state.error = "";
      state.summary = action.payload;
    },
    fetchComments(state, action) {
      state.comments = action.payload;
    },
    productRating(state, action) {
      state.rating = action.payload;
    },
  },
});

export const productActions = productReducer.actions;

export default productReducer;
