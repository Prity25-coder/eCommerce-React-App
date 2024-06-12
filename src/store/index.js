import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../reducers/products/productsSlice"; 
import { cartReducer } from "../features/cart";
import { orderReducer } from "../features/order";

const store = configureStore({
  reducer: {
    allProducts: productReducer,
    cart: cartReducer,
    orders: orderReducer,
  }
})

export default store