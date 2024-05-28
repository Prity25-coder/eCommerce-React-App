import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, error: null, orderDetails: {} };

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    setInitialOrderState: (state, action) => {
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

    updateOrder: (state, action) => {
      state.cartDetails = action.payload;
    },
  },
});


export const {
  setInitialOrderState,
  setLoading,
  setError,
  updateOrder,
} = orderSlice.actions;

export const orderSelector = (store) => store.cart;

export const orderReducer = orderSlice.reducer;
