import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants";
import checkResponse from "../../utils/checkResponse";



export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/ingredients`);

      // Используйте checkResponse для проверки ответа
      const data = await checkResponse(response);

      return data.data;
    } catch (err) {
      // Проверяем, является ли ошибка экземпляром Error
      if (err instanceof Error) {
        return rejectWithValue(err.message); // Безопасный доступ к сообщению об ошибке
      } else {
        return rejectWithValue("Произошла неизвестная ошибка");
      }
    }
  }
);