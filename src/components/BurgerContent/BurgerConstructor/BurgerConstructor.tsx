import React, { useState, useRef } from "react";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerStyles.module.css";
import { Product } from "../BurgerIngredients/types"; //  тип продукта здесь
import ModalWindow from "./ModalWindow/ModalWindow";
import CheckMark from "./SVG/CheckMark";

import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  placeOrder,
} from "../BurgerIngredients/services/burgerConstructorSlice";

// Функция генерации идентификатора заказа
const generateOrderId = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Генерация четырехзначного числа
};
interface BurgerConstructorProps {
  selectedIngredients: Product[];
  onAddIngredient: (ingredient: Product) => void;
  onRemoveIngredient: (index: number) => void;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
  
  selectedIngredients,
  onAddIngredient,
  onRemoveIngredient,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "PRODUCT",
    drop: (item: { data: Product }) => {
      if (
        item.data.type === "bun" &&
        selectedIngredients.some((ingredient) => ingredient.type === "bun")
      ) {
        return;
      }
      onAddIngredient(item.data);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [isModalActive, setIsModalActive] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const totalPrice = selectedIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  const bun = selectedIngredients.find(
    (ingredient) => ingredient.type === "bun"
  );
  const otherIngredients = selectedIngredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  // Функция для закрытия модального окна
  const handleModalClose = () => {
    setIsModalActive(false);
  };

  // Функция для открытия модального окна и генерации идентификатора заказа
  const handleOrderClick = () => {
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    setIsModalActive(true);
  };

  
  return (
    
      <>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.contentConstructor} ref={drop}>
          <h2 className="text text_type_main-medium">Ваш бургер</h2>
          <div className={styles.listConstructor}>
            {bun && (
              <div className={styles.constructorElement}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            )}
            {otherIngredients.map((ingredient: Product, index: number) => (
              <div key={index} className={styles.constructorElement}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  handleClose={() => onRemoveIngredient(index)}
                />
              </div>
            ))}
            {bun && (
              <div className={styles.constructorElement}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            )}
          </div>
        </section>
        <section className={`ml-1 mr-1 mb-1 mt-9 ${styles.boxForButton}`}>
          <div className={styles.footerOrder}>
            <div>
              <p className="text text_type_digits-medium">{totalPrice}</p>
            </div>
            <div>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={handleOrderClick}
            >
              Оформить заказ
            </Button>
          </div>
        </section>

        <ModalWindow active={isModalActive} setActive={setIsModalActive}>
          <div className={styles.boxModalClose}>
            <div className={`p-2`} style={{ cursor: "pointer" }}>
              <CloseIcon type="primary" onClick={handleModalClose} />
            </div>
          </div>
          <p className="mt-8 text text_type_digits-large">{orderId}</p>
          <p className="mb-10 text text_type_main-medium">
            Идентификатор заказа
          </p>
          <div>
            <CheckMark />
          </div>
          <p className="mt-10 text text_type_main-small">
            {" "}
            Ваш заказ начали готовить
          </p>
          <p className=" mt-2 text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </ModalWindow>
        </DndProvider> 
      </>
   
  );
};

export default BurgerConstructor;
