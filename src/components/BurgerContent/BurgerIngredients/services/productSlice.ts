import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types";

// Асинхронный thunk для получения продуктов
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/ingredients"
    );
    const data = await response.json();
    return data.data;
  }
);

// Функция сортировки с типизацией
const sortProducts = (products: Product[]): Product[] => {
  const order = ["bun", "sauce", "main"];
  return products
    .slice()
    .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
};

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
