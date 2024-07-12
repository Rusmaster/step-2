import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Product } from "../BurgerIngredients/types";
import styles from "./burgerStyles.module.css";

interface DraggableIngredientProps {
  ingredient: Product & { uniqueId: string };
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  onRemoveIngredient: (uniqueId: string) => void;
  type?: "top" | "bottom"; // Добавляем новый пропс type
  isLocked?: boolean; // Добавляем новый пропс isLocked
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
  ingredient,
  index,
  moveIngredient,
  onRemoveIngredient,
  type, // Добавляем в параметры функции
  isLocked, // Добавляем в параметры функции
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "INGREDIENT",
    hover(item: { index: number }) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (!ref.current) return;
      if (dragIndex === hoverIndex) return;

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "INGREDIENT",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={styles.constructorElement}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className={styles.dragHandle}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        type={type} // Передаем пропс type
        isLocked={isLocked} // Передаем пропс isLocked
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onRemoveIngredient(ingredient.uniqueId)}
      />
    </div>
  );
};

export default DraggableIngredient;
