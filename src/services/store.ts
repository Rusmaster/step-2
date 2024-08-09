import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredientsSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
