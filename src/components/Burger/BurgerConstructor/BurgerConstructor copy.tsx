import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import {  useAppDispatch } from "../../../services/hooks";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import { Product } from "../../../types/Product";
import styles from "./styles.module.css";
import DraggableIngredient from "./DraggableIngredient";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalPrice from "./TotalPrice";
import Modal from "../../../ui/ModalWindow/ModalWindow";
import OrderDetails from "./OrderDeatails";
import {
  sendOrderThunk,
  selectOrderStatus,
  selectOrderId,
} from "../../../services/order/orderSlice";
import { RootState } from "../../../services/store"; // Импорт типа для состояния
import { useNavigate } from "react-router-dom";

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
  const dispatch = useAppDispatch();
  const orderStatus = useSelector(selectOrderStatus);
  const navigate = useNavigate(); // Для навигации на страницу логина
  const orderIdFromStore = useSelector(selectOrderId);
  const { isAuthenticated } = useSelector((state: RootState) => state.user); // Проверка авторизации

  const [totalPrice, setTotalPrice] = useState(0);

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


  // Загрузка данных из localStorage при загрузке компонента
  useEffect(() => {
    const savedIngredients = localStorage.getItem("ingredients");
    const savedBun = localStorage.getItem("bun");

    if (savedIngredients) {
      setIngredients(JSON.parse(savedIngredients));
    }
    if (savedBun) {
      setBun(JSON.parse(savedBun));
    }
  }, []);

  // Сохранение ингредиентов в localStorage каждый раз, когда меняются булки или ингредиенты
  useEffect(() => {
    if (bun) {
      localStorage.setItem("bun", JSON.stringify(bun));
    }
    if (ingredients.length > 0) {
      localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }
  }, [ingredients, bun]);


  const addIngredientToConstructor = (ingredient: Product) => {
    const ingredientWithId = { ...ingredient, uuid: uuidv4() };
    if (ingredient.type === "bun") {
      setBun(ingredient);
    } else {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        ingredientWithId,
      ]);
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

  const [isModalActive, setIsModalActive] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

   const handleOrderClick = async () => {
     if (!bun || ingredients.length === 0) return;

     // Проверка авторизации перед отправкой заказа
     if (!isAuthenticated) {
       navigate("/login");
       return;
     }

     const ingredientIds = ingredients.map((ingredient) => ingredient._id);
     setIsModalActive(true);

     try {
       await dispatch(sendOrderThunk([bun._id, ...ingredientIds]));
     } catch (error) {
       console.error("Ошибка при отправке заказа:", error);
     }
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
              thumbnail="primary"
            />
          )}
          <div className={styles.middleSection}>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <DraggableIngredient
                  key={ingredient.uuid}
                  ingredient={ingredient}
                  index={index}
                  moveIngredient={moveIngredient}
                  removeIngredient={removeIngredient}
                />
              ))
            ) : (
              <div>Добавьте ингредиент</div>
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
        <Modal active={isModalActive} setActive={setIsModalActive}>
          <OrderDetails
            orderId={orderId || orderIdFromStore}
            totalPrice={totalPrice}
            orderStatus={orderStatus}
          ></OrderDetails>
        </Modal>
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
