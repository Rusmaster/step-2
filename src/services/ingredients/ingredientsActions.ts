import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/ingredients`);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
    } catch (err) {
      // Check if the error is an instance of Error
      if (err instanceof Error) {
        return rejectWithValue(err.message); // Safely accessing error message
      } else {
        return rejectWithValue("Произошла неизвестная ошибка");
      }
    }
  }
);
