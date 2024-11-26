import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/ingredientsSlice";
import orderReducer from "./order/orderSlice";
import userReducer  from "./userslice/userSlice";


const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: userReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;