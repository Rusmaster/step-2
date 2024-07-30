import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { Product } from "../../../types/Product";
import styles from "./styles.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ItemType = "ingredient";

// DraggableIngredient Component
const DraggableIngredient: React.FC<{
  ingredient: Product;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  removeIngredient: (index: number) => void;
}> = ({ ingredient, index, moveIngredient, removeIngredient }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveIngredient(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <>
      <div
        ref={(node) => dragRef(dropRef(node))}
        className={`${styles.ingredientItem} ${
          isDragging ? styles.dragging : ""
        }`}
      >
        <span className={styles.dragHandle}>
          <DragIcon type="primary" />
        </span>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => removeIngredient(index)}
        />
      </div>
    </>
  );
};
export default DraggableIngredient;
