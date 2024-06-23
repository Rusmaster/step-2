import React, { useState, useEffect } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CloseIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import products from "../../../utils/data";
import ModalWindow from "../../../utils/ModalWindow/ModalWindow";
import styles from "./burgerStyles.module.css";
import CheckMark from "./SVG/CheckMark";

const BurgerConstructor: React.FC = () => {
  const [modalActive, setIsModalActive] = useState(false);

  // Функция для закрытия модального окна
  const handleModalClose = () => {
    setIsModalActive(false);
  };

const handleModalKeyClose = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    handleModalClose();
  }
};

useEffect(() => {
  document.addEventListener("keydown", handleModalKeyClose);
  return () => {
    document.removeEventListener("keydown", handleModalKeyClose);
  };
}, []);

  return (
    <>
      <section className={styles.contentConstructor}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {products.map((itemBurger, index) => {
            // Example condition to lock certain items
            const isLocked = index === 0 || index === products.length - 1;

            return (
              <div>
                <DragIcon type="primary" />
                <ConstructorElement
                  key={index}
                  text={itemBurger.name}
                  price={itemBurger.price}
                  thumbnail={itemBurger.image_mobile}
                  isLocked={isLocked}
                />
              </div>
            );
          })}
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
      <ModalWindow active={modalActive} setActive={setIsModalActive}>
        <div className={styles.boxModalClose}>
          <div className={`p-2`} style={{ cursor: "pointer" }}>
            <CloseIcon type="primary" onClick={() => handleModalClose()} />
          </div>
        </div>
        <p className="mt-8 text text_type_digits-large">12345</p>
        <p className="mb-10 text text_type_main-medium">Идентификатор заказа</p>
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
    </>
  );
};
export default BurgerConstructor;
