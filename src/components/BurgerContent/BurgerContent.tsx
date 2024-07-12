import React, { useState } from "react";
import BurgerConstructor from "./BurgerConstructor";
import BurgerIngredients from "./BurgerIngredients";
import styles from "./styles.module.css";
import { Product } from "./BurgerIngredients/types";

const BurgerContent: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<
    (Product & { uniqueId: string })[]
  >([]);

  const generateUniqueId = (): string => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const handleAddIngredient = (ingredient: Product) => {
    const ingredientWithId = { ...ingredient, uniqueId: generateUniqueId() };
    setSelectedIngredients([...selectedIngredients, ingredientWithId]);
  };

  const handleRemoveIngredient = (uniqueId: string) => {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient.uniqueId !== uniqueId
      )
    );
  };

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const draggedIngredient = selectedIngredients[dragIndex];
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients.splice(dragIndex, 1);
    updatedIngredients.splice(hoverIndex, 0, draggedIngredient);
    setSelectedIngredients(updatedIngredients);
  };

  return (
    <div className={styles.burgerContent}>
      <div>
        <BurgerIngredients onAddIngredient={handleAddIngredient} />
      </div>
      <div>
        <BurgerConstructor
          selectedIngredients={selectedIngredients}
          onAddIngredient={handleAddIngredient}
          onRemoveIngredient={handleRemoveIngredient}
          moveIngredient={moveIngredient}
        />
      </div>
    </div>
  );
};

export default BurgerContent;
