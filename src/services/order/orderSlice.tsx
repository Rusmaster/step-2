// services/order/orderSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Ingredient } from "./api"; // Модуль для работы с API, где хранятся запросы
import { RootState } from "../store"; // Типизация корневого состояния

// Определяем типы для состояния заказа
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

// Асинхронный thunk для отправки заказа
export const sendOrderThunk = createAsyncThunk(
  "order/sendOrder",
  async (ingredients: Ingredient[], { rejectWithValue }) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке заказа");
      }

      const data = await response.json();
      return data.orderId; // Предположим, что в ответе есть поле orderId
    } catch (error) {
      // Приведение типа error к Error для корректной обработки
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
