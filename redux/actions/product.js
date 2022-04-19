import { getError } from "../../utils/error";
import { productActions } from "../reducers/product";
import http from "../../services/httpService";

export const fetchProducts = async (dispatch) => {
  try {
    dispatch(productActions.fetchRequest());
    const { data } = await http.get(`/api/admin/products`);
    dispatch(productActions.fetchSuccess(data));
  } catch (error) {
    dispatch(productActions.fetchFail(getError(error)));
  }
};

export const createProductHandler = async (
  dispatch,
  enqueueSnackbar,
  router
) => {
  try {
    dispatch(productActions.createRequest());
    const { data } = await http.post("/api/admin/products", {});
    enqueueSnackbar("محصول با موفقیت ایجاد شد", { variant: "success" });
    router.push(`/admin/product/${data.product._id}`);
    dispatch(productActions.createSuccess());
  } catch (err) {
    enqueueSnackbar(getError(err), { variant: "error" });
    dispatch(productActions.createFail());
  }
};

export const deleteProductHandler = async (
  productId,
  dispatch,
  token,
  enqueueSnackbar
) => {
  try {
    dispatch(productActions.deleteRequest());
    await http.delete(`/api/admin/products/${productId}`);
    enqueueSnackbar("محصول با موفقیت حذف شد", { variant: "success" });
    dispatch(productActions.deleteSuccess());
    fetchProducts(dispatch, token);
  } catch (err) {
    enqueueSnackbar(getError(err), { variant: "error" });
    dispatch(productActions.deleteFail());
  }
};

export const updateProductHandler = async (
  values,
  imageValue,
  closeSnackbar,
  enqueueSnackbar,
  dispatch,
  router,
  productId
) => {
  if (imageValue !== "") values.image = imageValue;
  closeSnackbar();
  try {
    dispatch(productActions.loadingUpdate());
    await http.put(`/api/admin/products/${productId}`, values);
    enqueueSnackbar("اطلاعات محصول با موفقیت ویرایش شد", {
      variant: "success",
    });
    router.push("/admin/products");
    dispatch(productActions.successUpdate());
  } catch (error) {
    dispatch(productActions.failUpdate(getError(error)));
    enqueueSnackbar(getError(error), { variant: "error" });
  }
};

export const uploadImageHandler = async (
  e,
  dispatch,
  setImageValue,
  enqueueSnackbar
) => {
  const file = e.target.files[0];
  const bodyFormData = new FormData();
  bodyFormData.append("file", file);
  try {
    dispatch(productActions.uploadImage());
    const { data } = await http.post("/api/admin/upload", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(productActions.uploadImageSuccess());
    setImageValue(data.secure_url);
    enqueueSnackbar("فایل با موفقیت آپلود شد", { variant: "success" });
  } catch (err) {
    dispatch(productActions.uploadImageFail(getError(err)));
    enqueueSnackbar(getError(err), { variant: "error" });
  }
};

export const fetchSummary = async (dispatch) => {
  try {
    productActions.fetchRequest();
    const { data } = await http.get(`/api/admin/summary`);
    dispatch(productActions.fetchSummarySuccess(data));
  } catch (error) {
    dispatch(productActions.fetchFail(getError(error)));
  }
};

export const fetchComments = async (product, dispatch, enqueueSnackbar) => {
  try {
    const { data } = await http.get(`/api/products/${product._id}/comments`);
    dispatch(productActions.fetchComments(data));
  } catch (err) {
    enqueueSnackbar(getError(err), { variant: "error" });
  }
};

export const submitCommentHandler = async (
  event,
  product,
  values,
  dispatch,
  enqueueSnackbar,
  setOpen,
  setComment,
  setRating
) => {
  event.preventDefault();
  try {
    dispatch(productActions.createRequest());
    await http.post(`/api/products/${product._id}/comments`, values);
    enqueueSnackbar("دیدگاه شما با موفقیت ثبت شد", { variant: "success" });
    dispatch(productActions.createSuccess());
    setComment("");
    setRating(0);
    fetchComments(product, dispatch, enqueueSnackbar);
    setOpen(false);
  } catch (err) {
    enqueueSnackbar(getError(err), { variant: "error" });
  }
};
