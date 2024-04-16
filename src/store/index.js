import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../reducers/products/productsReducer";

const store = configureStore({
  reducer: {
    allProducts: productReducer
  }
})

export default store