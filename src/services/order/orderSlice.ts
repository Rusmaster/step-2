import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BASE_URL } from "../constants";
import checkResponse from "../../utils/checkResponse";

interface OrderResponse {
  orderId: string;
}

// Типи состояния
interface OrderState {
  orderId: string | null;
  orderStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  orderId: null,
  orderStatus: "idle",
  error: null,
};

export const sendOrderThunk = createAsyncThunk(
  "order/sendOrder",
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientIds }), // Отправляем только IDs
      });

      //const data = await response.json();
      const data = await checkResponse(response);
      console.log("Ответ от сервера:", data);

      // Проверка успешного ответа
      if (!data.success) {
        return rejectWithValue("Ошибка при оформлении заказа");
      }

      // Возвращаем номер заказа
      return data.order.number;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Произошла неизвестная ошибка");
      }
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderId = null;
      state.orderStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.orderStatus = "loading";
        state.error = null;
      })
      .addCase(sendOrderThunk.fulfilled, (state, action) => {
        state.orderStatus = "succeeded";
        state.orderId = action.payload;
      })
      .addCase(sendOrderThunk.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export const selectOrderStatus = (state: RootState) => state.order.orderStatus;
export const selectOrderId = (state: RootState) => state.order.orderId;

export default orderSlice.reducer;
