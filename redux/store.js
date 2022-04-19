import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "./reducers/order";
import productReducer from "./reducers/product";
import userReducer from "./reducers/user";

const store = configureStore({
  reducer: {
    order: orderReducer.reducer,
    product: productReducer.reducer,
    user: userReducer.reducer,
  },
});

export default store;
