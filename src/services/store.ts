import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/ingredientsSlice";
import orderReducer from "./order/orderSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
