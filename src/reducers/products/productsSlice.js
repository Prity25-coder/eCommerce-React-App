import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  originalProducts: [],
  loading: false,
  error: null,
  isSorted: false,
  isLoaded: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    initializeProducts: (state, action) => {
      state.products = action.payload;
      state.originalProducts = action.payload;
      state.loading = false;
      state.isLoaded = true;
    },

    setLoading: (state) => {
      state.loading = true;
    },

    setApiError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload.data);
      state.loading = false;
    },

    updateProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      state.loading = false;
    },

    sortByPrice: (state) => {
      state.products = [...state.products].sort((a, b) => a.price - b.price);
      state.loading = false;
      state.isSorted = true;
    },
    clearSort: (state) => {
      state.products = state.originalProducts;
      state.isSorted = false;
      state.loading = false;
    },

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
  clearSort,
  deleteProductById,
} = productsSlice.actions;

export const productSelector = (store) => store.allProducts;
