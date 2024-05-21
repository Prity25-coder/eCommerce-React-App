import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setError,
  setInitialCartState,
  setLoading,
  updateCart,
  removeCart,
} from "../Slices/cartSlice";

import cartService from "../services/cartService";

const getCartDetails = createAsyncThunk("cart/get", async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoading());
  try {
    const cartInfo = await cartService.getCartInfo();
    // console.log("cartInfo : ", cartInfo);
    thunkAPI.dispatch(setInitialCartState(cartInfo));
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(setError(error.message));
  }
});

const addToCart = createAsyncThunk("cart/add", async (payload, thunkAPI) => {
  thunkAPI.dispatch(setLoading());
  const { cart } = thunkAPI.getState();

  const cartInfo = cartService.getUpdatedCart(cart.cartDetails, payload);

  try {
    const updatedCartInfo = await cartService.addToCart(cartInfo);
    thunkAPI.dispatch(updateCart(updatedCartInfo));
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(setError(error.message));
  }
});

const decreaseCartItem = createAsyncThunk(
  "cart/decrease",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    const { cart } = thunkAPI.getState();
    const cartInfo = cartService.decreaseCartItem(cart.cartDetails, payload);

    try {
      const removeCartInfo = await cartService.addToCart(cartInfo);
      thunkAPI.dispatch(removeCart(removeCartInfo));
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setError(error.message));
    }
  }
);

const removeCartProduct = createAsyncThunk(
  "cart/remove",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    const { cart } = thunkAPI.getState();
    const cartInfo = cartService.removeCartItem(cart.cartDetails, payload);

    try {
      const removeCartInfo = await cartService.addToCart(cartInfo);
      thunkAPI.dispatch(removeCart(removeCartInfo));
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setError(error.message));
    }
  }
);


export { getCartDetails, addToCart, decreaseCartItem,removeCartProduct };
