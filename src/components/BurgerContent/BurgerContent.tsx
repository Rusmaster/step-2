import React, { useState } from "react";
import BurgerConstructor from "./BurgerConstructor";
import BurgerIngredients from "./BurgerIngredients";
import styles from "./styles.module.css";
import { Product } from "./BurgerIngredients/types";

const BurgerContent: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Product[]>([]);

  // Функция для добавления ингредиента в конструктор
  const handleAddIngredient = (ingredient: Product) => {
    setSelectedIngredients((prevIngredients) => [
      ...prevIngredients,
      ingredient,
    ]);
  };
  const handleRemoveIngredient = (index: number) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  return (
    <div className={styles.burgerContent}>
      <div>
        <BurgerIngredients />
      </div>
      <div>
        <BurgerConstructor
          selectedIngredients={selectedIngredients}
          onAddIngredient={handleAddIngredient}
          onRemoveIngredient={handleRemoveIngredient}
        />
      </div>
    </div>
  );
};
export default BurgerContent;
