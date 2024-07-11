// src/actions/productActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../components/BurgerContent/BurgerIngredients/types";
import { BASE_URL } from "../constants";  // Импортируем базовый URL

// Асинхронный thunk для получения продуктов
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${BASE_URL}/ingredients`);
    const data = await response.json();
    return data.data;
  }
);

// Функция сортировки с типизацией
export const sortProducts = (products: Product[]): Product[] => {
  const order = ["bun", "sauce", "main"];
  return products
    .slice()
    .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
};
