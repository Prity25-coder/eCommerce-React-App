import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, error: null, cartDetails: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitialCartState: (state, action) => {
      state.loading = false;
      state.cartDetails = action.payload;
    },

    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateCart: (state, action) => {
      state.cartDetails = action.payload;
    },
  },
});

export const { setInitialCartState, setLoading, setError, updateCart } =
  cartSlice.actions;

export const cartSelector = (store) => store.cart;

export const cartReducer = cartSlice.reducer;
