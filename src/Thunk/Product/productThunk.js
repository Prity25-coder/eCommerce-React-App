import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  initializeProducts,
  setApiError,
  setLoading,
} from "../../reducers/products/productsSlice";

export const getProducts = createAsyncThunk(
  "products/get-products",
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      const response = await fetch(arg.url);
      const data = await response.json();
      thunkAPI.dispatch(initializeProducts(data));
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setApiError(error.message));
    }
  }
);
