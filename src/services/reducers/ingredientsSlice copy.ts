import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./../../types/Product";

export interface IngredientsState {
  isLoading: boolean;
  hasError: boolean;
  data: Product[];
}

const initialState: IngredientsState = {
  isLoading: false,
  hasError: false,
  data: [],
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/ingredients"
    );
    const data = await response.json();
    return data.data;
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default ingredientsSlice.reducer;
