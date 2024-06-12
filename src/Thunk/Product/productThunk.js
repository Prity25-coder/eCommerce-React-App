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
import { alertService } from "../../services";

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
      thunkAPI.dispatch(addProduct({ data: arg.data }));

      alertService.showSuccessAlert("Product created successfully...");
    } catch (error) {
      console.error(error);
      alertService.showErrorAlert("Product creation failed!");
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
      alertService.showSuccessAlert("Product updated successfully!");
      thunkAPI.dispatch(updateProduct(data));
    } catch (error) {
      console.error(error);
      alertService.showErrorAlert("Product update failed!");
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

      thunkAPI.dispatch(deleteProductById({ id: arg.id }));
      alertService.showSuccessAlert("Product deleted successfully...");
    } catch (error) {
      console.error(error);
      alertService.showErrorAlert("Product deletion failed!");
      thunkAPI.dispatch(setApiError(error.message));
    }
  }
);
