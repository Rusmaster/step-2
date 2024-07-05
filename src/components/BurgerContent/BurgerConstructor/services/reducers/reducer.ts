import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../actions";
import { Product } from "../../../BurgerIngredients/types";

interface BurgerState {
  selectedIngredients: Product[];
}

const initialState: BurgerState = {
  selectedIngredients: [],
};

const burgerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    case REMOVE_INGREDIENT:
      const newIngredients = [...state.selectedIngredients];
      newIngredients.splice(action.payload, 1);
      return {
        ...state,
        selectedIngredients: newIngredients,
      };
    default:
      return state;
  }
};

export default burgerReducer;