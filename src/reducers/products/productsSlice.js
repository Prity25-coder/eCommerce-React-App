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

    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    },

    updateProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      state.loading = false;
    },

    sortByPrice: (state, action) => {},

    deleteProductById: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.loading = false;
    },
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
  deleteProductById,
} = productsSlice.actions;

export const productSelector = (store) => store.allProducts;
