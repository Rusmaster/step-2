import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await fetch(`${BASE_URL}/ingredients`);
    const data = await response.json();
    return data.data;
  }
);