import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isLoaded: false,
  error: null,
  orderDetails: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    setInitialOrderState: (state, action) => {
      state.loading = false;
      state.orderDetails = action.payload;
      state.isLoaded = true;
    },

    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateOrder: (state, action) => {
      state.orderDetails = action.payload;
    },
  },
});

export const { setInitialOrderState, setLoading, setError, updateOrder } =
  orderSlice.actions;

export const orderSelector = (store) => store.orders;

export const orderReducer = orderSlice.reducer;
