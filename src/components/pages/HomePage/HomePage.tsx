import React, { useState } from "react";
import BurgerIngredients from "../../Burger/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../Burger/BurgerConstructor/BurgerConstructor";
import DndContext from "../../../DndContext";
import styles from "./styles.module.css";
import { Product } from "../../../types/Product";


const HomePage = () => {
  const [ingredients, setIngredients] = useState<Product[]>([]);
  const [bun, setBun] = useState<Product | null>(null);

  const totalPrice =
    ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) +
    (bun ? bun.price * 2 : 0);

  const ingredientCount = ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient._id]) {
      acc[ingredient._id] = 0;
    }
    acc[ingredient._id]++;
    return acc;
  }, {} as { [key: string]: number });

  if (bun) {
    ingredientCount[bun._id] = 2; // Верхняя и нижняя булка
  }

  return (
    <DndContext>
      <main className={styles.burgerContent}>
        <BurgerIngredients ingredientCount={ingredientCount} />
        <BurgerConstructor
          ingredients={ingredients}
          setIngredients={setIngredients}
          bun={bun}
          setBun={setBun}
          totalPrice={totalPrice}
        />
      </main>
    </DndContext>
  );
};

export default HomePage;