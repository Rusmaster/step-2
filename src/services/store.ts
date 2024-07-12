import { configureStore } from "@reduxjs/toolkit";
//import productReducer from "./productSlice";
import productReducer from "./reducers/productReducer";
//import burgerConstructorReducer from "./burgerConstructorSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
   // burgerConstructor: burgerConstructorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
