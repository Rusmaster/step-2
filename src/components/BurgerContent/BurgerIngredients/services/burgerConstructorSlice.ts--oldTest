import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types";

interface BurgerConstructorState {
  selectedIngredients: Product[];
  totalPrice: number;
  orderId: string | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: BurgerConstructorState = {
  selectedIngredients: [],
  totalPrice: 0,
  orderId: null,
  isLoading: false,
  hasError: false,
};

// Асинхронный экшен для оформления заказа
export const placeOrder = createAsyncThunk<
  string,
  void,
  { state: { burgerConstructor: BurgerConstructorState } }
>("burgerConstructor/placeOrder", async (_, thunkAPI) => {
  try {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/ingredients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients:
            thunkAPI.getState().burgerConstructor.selectedIngredients,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to place order");
    }
    const data = await response.json();
    return data.orderId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const calculateTotalPrice = (ingredients: Product[]): number => {
  return ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<Product>) {
      const ingredient = action.payload;
      if (
        ingredient.type === "bun" &&
        state.selectedIngredients.some((i) => i.type === "bun")
      ) {
        return;
      }
      state.selectedIngredients.push(ingredient);
      state.totalPrice = calculateTotalPrice(state.selectedIngredients);
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.selectedIngredients.splice(action.payload, 1);
      state.totalPrice = calculateTotalPrice(state.selectedIngredients);
    },
    moveIngredient(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedIngredient = state.selectedIngredients[dragIndex];
      state.selectedIngredients.splice(dragIndex, 1);
      state.selectedIngredients.splice(hoverIndex, 0, draggedIngredient);
      state.totalPrice = calculateTotalPrice(state.selectedIngredients);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.orderId = action.payload;
        state.selectedIngredients = [];
        state.totalPrice = 0;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { addIngredient, removeIngredient, moveIngredient } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
