import { createSlice } from "@reduxjs/toolkit";

const initialState = { lading: false, error: null, cartDetails: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setError } = cartSlice.actions;

export const cartSelector = (store) => store.cartDetails;

export const cartReducer = cartSlice.reducer;
