import React, { useState, useCallback, useEffect } from "react";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerStyles.module.css";
import { Product } from "../BurgerIngredients/types";
//import ModalWindow from "./ModalWindow/ModalWindow";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import CheckMark from "./SVG/CheckMark";
import DraggableIngredient from "./DraggableIngredient";
import { v4 as uuidv4 } from "uuid";
import OrderDetails from "./OrderDeatails";



const generateOrderId = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

interface BurgerConstructorProps {
  selectedIngredients: (Product & { uniqueId: string })[];
  onAddIngredient: (ingredient: Product) => void;
  onRemoveIngredient: (uniqueId: string) => void;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
  selectedIngredients,
  onAddIngredient,
  onRemoveIngredient,
  moveIngredient,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "PRODUCT",
    drop: (item: { data: Product }) => {
      // Поверка на наличие булки
       const bunExists = selectedIngredients.some(
         (ingredient) => ingredient.type === "bun"
       );
       if (item.data.type === "bun" && bunExists) return;

      const ingredientWithId = { ...item.data, uniqueId: uuidv4() };
      onAddIngredient(ingredientWithId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [isModalActive, setIsModalActive] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = useState(true);

  useEffect(() => {
    const bunExists = selectedIngredients.some(
      (ingredient) => ingredient.type === "bun"
    );
    setIsOrderButtonDisabled(!bunExists);
  }, [selectedIngredients]);

  const totalPrice = selectedIngredients.reduce((acc, ingredient) => {
    if (ingredient.type === "bun"){
      return acc + (ingredient.price ?? 0) * 2;
    }
    return acc + (ingredient.price ?? 0);
  }, 0);

  const bun = selectedIngredients.find(
    (ingredient) => ingredient.type === "bun"
  );
  const otherIngredients = selectedIngredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  const handleModalClose = () => {
    setIsModalActive(false);
  };

  const handleOrderClick = () => {
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    setIsModalActive(true);
  };

  const moveIngredientCallback = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      moveIngredient(dragIndex, hoverIndex);
    },
    [moveIngredient]
  );

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.contentConstructor} ref={drop}>
          <h2 className="text text_type_main-medium"></h2>
          <div className={styles.listConstructor}>
            {bun && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
            {otherIngredients.map((ingredient, index) => (
              <DraggableIngredient
                key={ingredient.uniqueId}
                index={index + 1}
                ingredient={ingredient}
                moveIngredient={moveIngredientCallback}
                onRemoveIngredient={onRemoveIngredient}
              />
            ))}
            {bun && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
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
              disabled={isOrderButtonDisabled}
            >
              Оформить заказ
            </Button>
          </div>
        </section>

        <ModalWindow active={isModalActive} setActive={setIsModalActive}>
          <OrderDetails orderId={orderId} totalPrice={totalPrice}>
        
          </OrderDetails>
        </ModalWindow>
      </DndProvider>
    </>
  );
};

export default BurgerConstructor;
