import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../services/store";
import { fetchProducts } from "../../../services/actions/productActions"; // Обновить путь импорта
import ingridient from "./ingridient.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Product } from "./types";
import ProductItem from "./ProductItem";
import useFetchProducts from "./useFetchProducts";
import ProductDetailsModal from "./ProductDetailsModal";
import { useInView } from "react-intersection-observer";

// Функция генерации уникального идентификатора
const generateUniqueId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};


interface BurgerIngredientsProps {
  onAddIngredient: (ingredient: Product) => void;
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
  onAddIngredient,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, hasError } = useFetchProducts();
  const [current, setCurrent] = React.useState("bun");

  const [selectedIngredients, setSelectedIngredients] = useState<
    (Product & { uniqueId: string })[]
  >([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

const [bunInViewRef, bunInView] = useInView({ threshold: 0.3 });
const [sauceInViewRef, sauceInView] = useInView({ threshold: 0.3 });
const [mainInViewRef, mainInView] = useInView({ threshold: 0.5 });

useEffect(() => {
  if (bunInView) {
    setCurrent("bun");
  } else if (sauceInView) {
    setCurrent("sauce");
  } else if (mainInView) {
    setCurrent("main");
  }
}, [bunInView, bunInView, mainInView]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalActive(true);
  };

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
            <div ref={bunInViewRef}>
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
          </div>
          <div ref={sauceRef}>
            <div ref={sauceInViewRef}>
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
          </div>
          <div ref={mainRef}>
            <div ref={mainInViewRef}>
              <h2
                className={`text text_type_main-medium mt-15 ${ingridient.ingridientTitle}`}
              >
                Начинки
              </h2>
              <ul
                className={ingridient.ingridientsContainer}               
              >
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
