import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "../../services/store";
import BurgerIngredients from "../Burger/BurgerIngredients/BurgerIngredients";
import DndContext from "./../../DndContext";
import BurgerConstructor from "../Burger/BurgerConstructor/BurgerConstructor";
import { Product } from "./../../types/Product";
import styles from "./styles.module.css";
import AppHeader from "../AppHeader";

function App() {
  const [ingredients, setIngredients] = useState<Product[]>([]);
  const [bun, setBun] = useState<Product | null>(null);

  // Создаем объект для хранения количества каждого ингредиента
  const ingredientCount = ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient._id]) {
      acc[ingredient._id] = 0;
    }
    acc[ingredient._id]++; 
    return acc;
  }, {} as { [key: string]: number });

  // Если булка выбрана, добавляем ее количество
  if (bun) {
    ingredientCount[bun._id] = 2; // Верхняя и нижняя булка
  }
  return (
    <Provider store={store}>
      <div className="App">
        <AppHeader />
        <DndContext>
          <main className={styles.burgerContent}>
            <BurgerIngredients ingredientCount={ingredientCount} />
            <BurgerConstructor
              ingredients={ingredients}
              setIngredients={setIngredients}
              bun={bun}
              setBun={setBun}
            />
          </main>
        </DndContext>
      </div>
    </Provider>
  );
}

export default App;
