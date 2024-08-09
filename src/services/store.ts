import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredientsSlice";
import orderReducer from "./actions/orderSlice";

const store = configureStore({
  reducer: {
    order: orderReducer,
    ingredients: ingredientsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
