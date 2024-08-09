import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import { Product } from "../../../types/Product";
import styles from "./styles.module.css";
import DraggableIngredient from "./DraggableIngredient";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalPrice from "./TotalPrice";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import OrderDetails from "./OrderDeatails";
import { submitOrder } from "../../../services/actions/orderActions";
import { RootState, AppDispatch } from "../../../services/store";

const ItemType = "ingredient";

interface BurgerConstructorProps {
  ingredients: Product[];
  setIngredients: React.Dispatch<React.SetStateAction<Product[]>>;
  bun: Product | null;
  setBun: React.Dispatch<React.SetStateAction<Product | null>>;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
  ingredients,
  setIngredients,
  bun,
  setBun,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
   const dispatch: AppDispatch = useDispatch();
  const orderId = useSelector((state: RootState) => state.order.orderId);
  const orderLoading = useSelector((state: RootState) => state.order.loading);
  const orderError = useSelector((state: RootState) => state.order.error);

  const [{ isOver }, dropRef] = useDrop({
    accept: ItemType,
    drop: (item: { data: Product }) => {
      if (item && item.data) {
        addIngredientToConstructor(item.data);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const addIngredientToConstructor = (ingredient: Product) => {
    if (ingredient.type === "bun") {
      setBun(ingredient);
    } else {
      setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    }
  };

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    if (
      dragIndex === undefined ||
      hoverIndex === undefined ||
      dragIndex === hoverIndex
    )
      return;

    const draggedIngredient = ingredients[dragIndex];
    if (!draggedIngredient) return;

    const newIngredients = [...ingredients];
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, draggedIngredient);
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    let total = ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    if (bun) {
      total += bun.price * 2; // Учитываем верхнюю и нижнюю булку
    }
    setTotalPrice(total);
  }, [ingredients, bun]);

  //Генератор id заказа
  const generateOrderId = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  //Модальное окно
  const [isModalActive, setIsModalActive] = useState(false);
  const handleOrderClick = () => {
    if (bun && ingredients.length > 0) {
      const ingredientIds = [
        bun._id,
        ...ingredients.map((ingredient) => ingredient._id),
        bun._id,
      ];
      dispatch(submitOrder({ ingredients: ingredientIds }));
      console.log("Order submitted: ", ingredientIds);
    }
  };

  useEffect(() => {
    if (orderId) {
      setIsModalActive(true);
      console.log("Order ID received: ", orderId);
    }
  }, [orderId]);

  return (
    <section className={styles.constructorBox}>
      <div ref={dropRef}>
        <h2 className="text text_type_main-medium mb-5">Ваш бургер</h2>
        <div className={styles.burgerWrapper}>
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Добавьте булку"
              price={0}
              thumbnail="primary"
            />
          )}
          <div className={styles.middleSection}>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <DraggableIngredient
                  key={index}
                  ingredient={ingredient}
                  index={index}
                  moveIngredient={moveIngredient}
                  removeIngredient={removeIngredient}
                />
              ))
            ) : (
              <ConstructorElement
                text="Добавьте ингредиент"
                price={0}
                thumbnail=""
                isLocked={true}
              />
            )}
          </div>
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Добавьте булку"
              price={0}
              thumbnail=""
            />
          )}
        </div>
        {/* {isOver && <div className={styles.overlay}>Перенести </div>}*/}

        <ModalWindow active={isModalActive} setActive={setIsModalActive}>
          <OrderDetails
            orderId={orderId}
            totalPrice={totalPrice}
          ></OrderDetails>
        </ModalWindow>
        <div className={`ml-1 mr-1 mb-1 mt-9 ${styles.boxForButton}`}>
          <div className={styles.footerOrder}>
            <TotalPrice total={totalPrice} />
            <Button
              htmlType="button"
              type="primary"
              size="large"
              extraClass="ml-2"
              onClick={handleOrderClick}
              disabled={!bun || ingredients.length === 0 || orderLoading} // Условие для отключения кнопки
            >
              Оформить заказ
            </Button>
            {orderError && <p className={styles.error}>Ошибка: {orderError}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurgerConstructor;
