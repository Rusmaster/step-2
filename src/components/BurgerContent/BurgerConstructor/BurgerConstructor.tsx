import React, { useState, useEffect } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CloseIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import styles from "./burgerStyles.module.css";
import CheckMark from "./SVG/CheckMark";

interface Product {
  _id: string;
  name: string;
  price: number;
  image_mobile: string;
  isLocked: boolean;
}

const BurgerConstructor: React.FC = () => {
  const [modalActive, setIsModalActive] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  //const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://norma.nomoreparties.space/api/ingredients"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data.data);
        setIsLoading(false);
        setHasError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setHasError(true);
      }
    };

    fetchProducts();
  }, []);

  // Функция для закрытия модального окна
  const handleModalClose = () => {
    setIsModalActive(false);
  };



  return (
    <>
      <section className={styles.contentConstructor}>
        <div className={styles.listConstructor}>
          {isLoading && <p>Загрузка...</p>}
          {hasError && <p>Произошла ошибка</p>}
          {!isLoading &&
            !hasError &&
            products.map((itemBurger, index) => (
              <div key={itemBurger._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  key={index}
                  text={itemBurger.name}
                  price={itemBurger.price}
                  thumbnail={itemBurger.image_mobile}
                  isLocked={itemBurger.isLocked}

                />
              </div>
            ))}
        </div>
      </section>
      <section className={`ml-1 mr-1 mb-1 mt-9 ${styles.boxForButton}`}>
        <div className={styles.footerOrder}>
          <div>
            <p className="text text_type_digits-medium">733</p>
          </div>
          <div>
            <CurrencyIcon type="primary" />
          </div>

          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => setIsModalActive(true)}
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {/* Модальное окно */}
      {/*  {selectedProduct && ( */}
      <ModalWindow active={modalActive} setActive={setIsModalActive}>
        <div className={styles.boxModalClose}>
          <div className={`p-2`} style={{ cursor: "pointer" }}>
            <CloseIcon type="primary" onClick={() => handleModalClose()} />
          </div>
        </div>
        <p className="mt-8 text text_type_digits-large">12345</p>
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
      {/*   )}*/}
    </>
  );
};

export default BurgerConstructor;
