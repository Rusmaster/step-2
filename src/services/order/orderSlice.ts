import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Ingredient } from "./api";
import { RootState } from "../store";

// Define types for the response data from the API
interface OrderResponse {
  orderId: string;
}

// Order state type definition
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

// Async thunk for sending the order
export const sendOrderThunk = createAsyncThunk(
  "order/sendOrder",
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients: ingredientIds }), // Send only IDs
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Ошибка от сервера:", errorData); // Логирование ошибки
        return rejectWithValue(
          errorData.message || "Ошибка при отправке заказа"
        );
      }

      const data: OrderResponse = await response.json();
      console.log("Ответ от сервера:", data); // Логирование ответа
      // Additional validation of response data
      if (!data || typeof data.orderId !== "string") {
        return rejectWithValue("Неверный формат ответа от сервера");
      }

      return data.orderId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        console.log("Ошибка запроса:", error); // Логирование ошибки запроса
        return rejectWithValue("Произошла неизвестная ошибка");
      }
    }
  }
);

// Slice definition
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
