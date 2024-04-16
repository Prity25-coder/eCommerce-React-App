import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    initializeProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setApiError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addProduct: (state, action) => {},
    updateProduct: (state, action) => {},
    sortByPrice: (state, action) => {},
    deleteProduct: (state, action) => {},
  },
});

export const productReducer = productsSlice.reducer;

export const {
  initializeProducts,
  setLoading,
  addProduct,
  setApiError,
  updateProduct,
  sortByPrice,
  deleteProduct,
} = productsSlice.actions;

export const productSelector = (store) => store.allProducts;
