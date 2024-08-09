import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { BASE_URL } from "../constants"; // Импортируем базовый URL

// Асинхронный thunk для получения продуктов

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${BASE_URL}/ingredients`);
    const data = await response.json();
    return data.data;
  }
);
