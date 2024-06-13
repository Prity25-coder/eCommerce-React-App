import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isLoaded: false,
  isProcessing: false,
  error: null,
  cartDetails: {
    totalCartItems: 0,
    totalPrice: 0,
    cartItems: [],
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitialCartState: (state, action) => {
      state.loading = false;
      state.cartDetails = action.payload;
      state.isLoaded = true;
    },

    setLoading: (state) => {
      state.loading = true;
    },

    setOrderProcessing: (state, action) => {
      state.isProcessing = action.payload;
      if (!action.payload) {
        state.cartDetails = {
          totalCartItems: 0,
          totalPrice: 0,
          cartItems: [],
        };
      }
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateCart: (state, action) => {
      state.cartDetails = action.payload;
    },
    removeCart: (state, action) => {
      state.cartDetails = action.payload;
    },
  },
});

export const {
  setInitialCartState,
  setLoading,
  setError,
  updateCart,
  removeCart,
  setOrderProcessing,
} = cartSlice.actions;

export const cartSelector = (store) => store.cart;

export const cartReducer = cartSlice.reducer;
