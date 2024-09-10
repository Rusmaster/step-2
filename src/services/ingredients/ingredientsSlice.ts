import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { fetchIngredients } from "./ingredientsActions";

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
