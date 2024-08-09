import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./../../types/Product";
import { BASE_URL } from "../constants";
//import { fetchProducts } from "../actions/productActions";

export interface IngredientsState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  data: Product[];
}

const initialState: IngredientsState = {
  isLoading: false,
  hasError: false,
  errorMessage: null,
  data: [],
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await fetch(`${BASE_URL}/ingredients`);
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
        state.errorMessage = null;
      })
     
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload as string;
      });
      
  },
});

export default ingredientsSlice.reducer;
