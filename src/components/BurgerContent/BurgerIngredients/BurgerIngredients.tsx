import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./services/store";
import { fetchProducts } from "./services/productSlice";
import ingridient from "./ingridient.module.css";

import {
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Product } from "./types";
import ProductItem from "./ProductItem";
import useFetchProducts from "./useFetchProducts";
import ProductDetailsModal from "./ProductDetailsModal";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const BurgerIngredients: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, hasError } = useFetchProducts();
  const [current, setCurrent] = React.useState("bun");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
      {isLoading && <p>Загрузка... </p>}
      {hasError && <p>Произошла ошибка</p>}
      {!isLoading && !hasError && (
        <section className={ingridient.ingridients}>
          <div className="mt-9 mb-9" ref={bunRef}>
            <h2
              className={`text text_type_main-medium ${ingridient.ingridientTitle}`}
            >
              Булки
            </h2>
            <ul className={ingridient.ingridientsContainer}>
              {data
                .filter((product) => product.type === "bun")
                .map((product) => (
                  <ProductItem
                    key={product._id}
                    data={product}
                    onClick={handleProductClick}
                  />
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
              {data
                .filter((product) => product.type === "sauce")
                .map((product) => (
                  <ProductItem
                    key={product._id}
                    data={product}
                    onClick={handleProductClick}
                  />
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
              {data
                .filter((product) => product.type === "main")
                .map((product) => (
                  <ProductItem
                    key={product._id}
                    data={product}
                    onClick={handleProductClick}
                  />
                ))}
            </ul>
          </div>
        </section>
      )}
      <ProductDetailsModal
        product={selectedProduct}
        isActive={isModalActive}
        onClose={handleModalClose}
      />
    </>
  );
};

export default BurgerIngredients;
