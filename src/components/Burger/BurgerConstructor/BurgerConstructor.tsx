import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import styles from "./styles.module.css";
import DraggableIngredient from "./DraggableIngredient";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalPrice from "./TotalPrice";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import OrderDetails from "./OrderDeatails";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOrderThunk,
  clearOrder,
  selectOrderStatus,
  selectOrderId,
} from "../../../services/order/orderSlice";
import { RootState, AppDispatch } from "../../../services/store"; // Импортируем AppDispatch для типизации dispatch

import { Product } from "../../../types/Product";

const ItemType = "ingredient";

interface BurgerConstructorProps {
  ingredients: Product[];
  setIngredients: React.Dispatch<React.SetStateAction<Product[]>>;
  bun: Product | null;
  setBun: React.Dispatch<React.SetStateAction<Product | null>>;
  totalPrice: number;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
  ingredients,
  setIngredients,
  bun,
  setBun,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [{ isOver }, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item: { data: Product }) => {
      if (item && item.data) {
        addIngredientToConstructor(item.data);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const dispatch: AppDispatch = useDispatch();
  const orderStatus = useSelector(selectOrderStatus); // Получаем статус заказа
  const orderId = useSelector(selectOrderId); // Получаем ID заказа

  const addIngredientToConstructor = (ingredient: Product) => {
    if (ingredient.type === "bun") {
      setBun(ingredient);
    } else {
      setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    }
  };

  useEffect(() => {
    let total = ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    if (bun) {
      total += bun.price * 2;
    }
    setTotalPrice(total);
  }, [ingredients, bun]);

  const [isModalActive, setIsModalActive] = useState(false);

  const handleOrderClick = () => {
    if (bun && ingredients.length > 0) {
      const allIngredients = [bun, ...ingredients];
      dispatch(sendOrderThunk(allIngredients)); // Отправляем заказ
      setIsModalActive(true); // Открываем модальное окно после клика
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
              thumbnail=""
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
                  removeIngredient={() => removeIngredient(index)}
                />
              ))
            ) : (
              <div>добавить ингредиент</div>
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

        {/* Модальное окно с деталями заказа */}
        <ModalWindow active={isModalActive} setActive={setIsModalActive}>
          {orderStatus === "succeeded" ? (
         <OrderDetails orderId={orderId} totalPrice={totalPrice} />
           
          ) : (
             <p>Идет оформление заказа...</p>
            
          )}
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
              disabled={!bun || ingredients.length === 0}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurgerConstructor;