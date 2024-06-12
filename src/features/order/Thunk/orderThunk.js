import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import {
  setError,
  setInitialOrderState,
  setLoading,
  updateOrder,
} from "../slices/orderSlice";
import orderService from "../services/orderService";
import { setOrderProcessing } from "../../cart/Slices/cartSlice";

const getOrderDetails = createAsyncThunk("order/get", async (_, thunkAPI) => {
  const {
    orders: { isLoaded },
  } = thunkAPI.getState();

  if (isLoaded) return;

  thunkAPI.dispatch(setLoading());
  try {
    const orderInfo = await orderService.getOrderDetails();
    thunkAPI.dispatch(setInitialOrderState(orderInfo));
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(setError(error.message));
  }
});

const proceedToBuy = createAsyncThunk(
  "order/create",
  async ({ cartDetails, redirect }, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    thunkAPI.dispatch(setOrderProcessing(true));
    const { orders } = thunkAPI.getState();

    try {
      const orderData = {
        ...cartDetails,
        orderItems: cartDetails.cartItems,
        orderId: nanoid(),
        orderedAt: new Date().toISOString(),
      };
      delete orderData.cartItems;

      const orderInfo = [...orders.orderDetails, orderData];
      await orderService.proceedToBuy(orderInfo);
      thunkAPI.dispatch(updateOrder(orderInfo));
      thunkAPI.dispatch(setOrderProcessing(false));
      redirect("/orders");
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setError(error.message));
    }
  }
);

export { getOrderDetails, proceedToBuy };
