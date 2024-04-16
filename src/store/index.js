import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../reducers/products/productsSlice"; 
import { cartReducer } from "../features/cart";

const store = configureStore({
  reducer: {
    allProducts: productReducer,
    cartDetails: cartReducer,
  }
})

export default store