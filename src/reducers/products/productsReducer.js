import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {},
    updateProduct: (state, action) => {},
    sortByPrice: (state, action) => {},
    deleteProduct: (state, action) => {},
  },
});

export const productReducer = productsSlice.reducer;
export const { addProduct, updateProduct, sortByPrice, deleteProduct } =
  productsSlice.actions;
export const productSelector = (store) => store.allProducts;
