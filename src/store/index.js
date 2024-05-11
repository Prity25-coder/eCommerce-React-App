import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../reducers/products/productsSlice"; 
import { cartReducer } from "../features/cart";

const store = configureStore({
  reducer: {
    allProducts: productReducer,
    cart: cartReducer,
  }
})

export default store