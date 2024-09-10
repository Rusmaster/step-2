import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/ingredientsSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
