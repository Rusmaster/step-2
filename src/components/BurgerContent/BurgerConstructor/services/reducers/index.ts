// src/services/reducers/index.ts
import { combineReducers } from "redux";
import burgerReducer from "./reducer";

const rootReducer = combineReducers({
  burger: burgerReducer,
});

export default rootReducer;
