import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants"; 

interface OrderResponse {
  orderId: string;
}

const generateOrderId = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const submitOrder = createAsyncThunk<
  OrderResponse,
  { ingredients: string[] }
>("order/submitOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: orderData.ingredients }),
    });
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { orderId: generateOrderId() };
    //return data;
  } catch (error: any) {
    return rejectWithValue(`Ошибка ${error.message}`);
  }
});
