import React, { useState } from "react";
import BurgerIngredients from "./components/Burger/BurgerIngredients/BurgerIngredients";
import DndContext from "./DndContext";
import BurgerConstructor from "./components/Burger/BurgerConstructor/BurgerConstructor";
import { Product } from "./types/Product";

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
    <div className="App">
      <DndContext>
        <section>
          <BurgerIngredients ingredientCount={ingredientCount} />
          <BurgerConstructor
            ingredients={ingredients}
            setIngredients={setIngredients}
            bun={bun}
            setBun={setBun}
          />
        </section>
      </DndContext>
    </div>
  );
}

export default App;
