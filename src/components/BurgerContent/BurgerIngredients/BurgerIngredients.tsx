import React, { useRef, useState, useEffect } from "react";
import products from "../../../utils/data";
import ingridient from "./ingridient.module.css";
import modal from "./modal.module.css";
import {
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Типизация для бля блока "Продукты"
interface Product {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
}

// Функция сортировки с типизацией
const sortProducts = (products: Product[]): Product[] => {
  const order = ["bun", "sauce", "main"];
  return products
    .slice()
    .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
};

const BurgerIngredients: React.FC = () => {
  const sortedProducts = sortProducts(products as Product[]);
  const [current, setCurrent] = React.useState("bun");

  // Рефы для каждого раздела
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Состояние для модального окна
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  // Функция для прокрутки к выбранному разделу
  const handleTabClick = (value: string) => {
    setCurrent(value);
    switch (value) {
      case "bun":
        bunRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "sauce":
        sauceRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "main":
        mainRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  // Функция для открытия модального окна
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalActive(true);
  };
  // Функция для закрытия модального окна
  const handleModalClose = () => {
    setIsModalActive(false);
  };

  //Закрытие модального окна с помощью кнопки Esc
  {/* 
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
*/}
  return (
    <>
      <h1
        className={`mt-9 mb-6  text text_type_main-large ${ingridient.ingridientTitle}`}
      >
        Список продуктов
      </h1>
      <div style={{ display: "flex" }}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => handleTabClick("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => handleTabClick("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => handleTabClick("main")}
        >
          Начинки
        </Tab>
      </div>

      <section className={ingridient.ingridients}>
        <div className="mt-9 mb-9" ref={bunRef}>
          <h2
            className={`text text_type_main-medium ${ingridient.ingridientTitle}`}
          >
            Булки
          </h2>
          <ul className={ingridient.ingridientsContainer}>
            {sortedProducts
              .filter((product) => product.type === "bun")
              .map((product) => (
                <li
                  className={ingridient.ingridientsItem}
                  key={product._id}
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    className="ml-2 mr-2"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className={ingridient.priceBox}>
                    <p className={`text text_type_main-default`}>
                      {product.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <h3 className={`text text_type_main-default`}>
                    {product.name}
                  </h3>
                </li>
              ))}
          </ul>
        </div>
        <div ref={sauceRef}>
          <h2
            className={`text text_type_main-medium ${ingridient.ingridientTitle}`}
          >
            Соусы
          </h2>
          <ul className={ingridient.ingridientsContainer}>
            {sortedProducts
              .filter((product) => product.type === "sauce")
              .map((product) => (
                <li
                  className={ingridient.ingridientsItem}
                  key={product._id}
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    className="ml-2 mr-2"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className={ingridient.priceBox}>
                    <p className={`text text_type_main-default`}>
                      {product.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <h3 className={`text text_type_main-default`}>
                    {product.name}
                  </h3>
                </li>
              ))}
          </ul>
        </div>
        <div ref={mainRef} className="">
          <h2
            className={`text text_type_main-medium ${ingridient.ingridientTitle}`}
          >
            Начинки
          </h2>
          <ul className={ingridient.ingridientsContainer}>
            {sortedProducts
              .filter((product) => product.type === "main")
              .map((product) => (
                <li
                  className={ingridient.ingridientsItem}
                  key={product._id}
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    className="ml-2 mr-2"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className={ingridient.priceBox}>
                    <p className={`text text_type_main-default`}>
                      {product.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <h3 className={`text text_type_main-default`}>
                    {product.name}
                  </h3>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {selectedProduct && (
        <ModalWindow active={isModalActive} setActive={setIsModalActive}>
          <div className={modal.active}>
            <div className={ingridient.ModalHeader}>
              <h2 className="text text_type_main-large">Детали ингредиента</h2>
              <div className={`p-2`} style={{ cursor: "pointer" }}>
                <CloseIcon type="primary" onClick={() => handleModalClose()} />
              </div>
            </div>
            <div>
              <div>
                <img
                  src={selectedProduct.image_large}
                  alt={selectedProduct.name}
                />
                <h3>{selectedProduct.name}</h3>
              </div>
              <div className={ingridient.ingridentModal}>
                <ul
                  className={`text text_type_main-default ${ingridient.modalContentUl}`}
                >
                  <li
                    className={`text text_type_main-default ${ingridient.modalContentLi}`}
                  >
                    Калории, ккал
                  </li>
                  <li
                    className={`text text_type_main-default ${ingridient.modalContentLi}`}
                  >
                    {selectedProduct.calories}
                  </li>
                </ul>
                <ul className={ingridient.modalContentUl}>
                  <li
                    className={`text text_type_main-default ${ingridient.modalContentLi}`}
                  >
                    Белки, г
                  </li>
                  <li className={ingridient.modalContentLi}>
                    {selectedProduct.proteins}
                  </li>
                </ul>
                <ul className={ingridient.modalContentUl}>
                  <li
                    className={`text text_type_main-default ${ingridient.modalContentLi}`}
                  >
                    Жиры, г{" "}
                  </li>
                  <li
                    className={`text text_type_main-default ${ingridient.modalContentLi}`}
                  >
                    {selectedProduct.fat}
                  </li>
                </ul>
                <ul
                  className={`text text_type_main-default ${ingridient.modalContentUl}`}
                >
                  <li
                    className={`text text_type_main-default ${ingridient.modalContentLi}`}
                  >
                    Углеводы, г
                  </li>
                  <li className={ingridient.modalContentLi}>
                    {selectedProduct.carbohydrates}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ModalWindow>
      )}
    </>
  );
};

export default BurgerIngredients;
