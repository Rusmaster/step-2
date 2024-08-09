import { createSlice } from "@reduxjs/toolkit";
import { submitOrder } from "./orderActions";

interface OrderState {
  orderId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderId: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderId = action.payload.orderId;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
