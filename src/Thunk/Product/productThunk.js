import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
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
    const {
      allProducts: { isLoaded },
    } = thunkAPI.getState();

    if (isLoaded) return;

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
      await response.json();
      thunkAPI.dispatch(
        addProduct({
          data: { id: nanoid(10), ...arg.data },
        })
      );

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
    const {
      allProducts: { products },
    } = thunkAPI.getState();

    thunkAPI.dispatch(setLoading());
    try {
      console.log(arg.data);
      if (
        !products.find(
          (product) => product.id === arg.data.id && product.isAddedRecently
        )
      ) {
        const response = await fetch(getApiEndpoint(`products/${arg.id}`), {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(arg.data),
        });
        await response.json();
      }
      alertService.showSuccessAlert("Product updated successfully!");
      thunkAPI.dispatch(updateProduct(arg.data));
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
      const {
        allProducts: { products },
      } = thunkAPI.getState();
      if (
        !products.find(
          (product) => product.id === arg.id && product.isAddedRecently
        )
      ) {
        const response = await fetch(getApiEndpoint(`products/${arg.id}`), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        await response.json();
      }

      thunkAPI.dispatch(deleteProductById({ id: arg.id }));
      alertService.showSuccessAlert("Product deleted successfully...");
    } catch (error) {
      console.error(error);
      alertService.showErrorAlert("Product deletion failed!");
      thunkAPI.dispatch(setApiError(error.message));
    }
  }
);
