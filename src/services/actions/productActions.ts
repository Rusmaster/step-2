import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { BASE_URL } from "../constants"; // Импортируем базовый URL

// Асинхронный thunk для получения продуктов
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
   try {
      const response = await fetch(`${BASE_URL}/ingredients`);
      if (!response.ok) {
         throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      return rejectWithValue(`Ошибка сервера ${error.message}`);
    }
  }

);
