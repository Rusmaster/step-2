// src/services/actions/burgerActions.ts
import { Product } from "../../../BurgerIngredients/types";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export const addIngredient = (ingredient: Product) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
});

export const removeIngredient = (index: number) => ({
  type: REMOVE_INGREDIENT,
  payload: index,
});