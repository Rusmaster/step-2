// src/reducers/productReducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../components/BurgerContent/BurgerIngredients/types";
import { fetchProducts, sortProducts } from "../actions/productActions";

const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    hasError: false,
    data: [] as Product[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.data = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.data = sortProducts(action.payload);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.data = [];
      });
  },
});

export default productSlice.reducer;
