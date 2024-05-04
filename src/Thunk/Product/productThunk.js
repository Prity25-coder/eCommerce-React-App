import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProduct,
  initializeProducts,
  setApiError,
  setLoading,
  updateProduct,
  deleteProductById,
} from "../../reducers/products/productsSlice";
import getApiEndpoint from "../../utils/getApiEndpoint";

export const getProducts = createAsyncThunk(
  "products/get-products",
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      const response = await fetch(getApiEndpoint("products"));
      const data = await response.json();
      thunkAPI.dispatch(initializeProducts(data));
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setApiError(error.message));
    }
  }
);

// Add Product function
export const createProduct = createAsyncThunk(
  "products/create-product",
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      const response = await fetch(getApiEndpoint("products"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg.data),
      });
      const data = await response.json();
      console.log(data);
      thunkAPI.dispatch(addProduct(data));
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(setApiError(error.message));
    }
  }
);
// update Product function
export const patchProduct = createAsyncThunk(
  "products/patch-product",
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      const response = await fetch(getApiEndpoint(`products/${arg.id}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg.data),
      });
      const data = await response.json();
      console.log(data);
      thunkAPI.dispatch(updateProduct(data));
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(setApiError(error.message));
    }
  }
);

// Delete Product function
export const deleteProduct = createAsyncThunk(
  "products/delete-product",
  async (arg, thunkAPI) => {
    console.log(arg);
    thunkAPI.dispatch(setLoading());
    try {
      const response = await fetch(getApiEndpoint(`products/${arg.id}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      console.log(data);
      thunkAPI.dispatch(deleteProductById({ id: data.id }));

    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(setApiError(error.message));
    }
  }
);
