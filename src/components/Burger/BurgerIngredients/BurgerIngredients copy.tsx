import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../../services/reducers/ingredientsSlice";
import { Product } from "../../../types/Product";
import styles from "./styles.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
import { useDrag } from "react-dnd";
import ProductDetailsModal from "./ProductDetailsModal";

interface IngredientProps {
  data: Product;
  count: number; // Добавляем проп для количества
  onClick: (data: Product) => void; // Добавляем проп для обработчика клика
}

const Ingredient: React.FC<IngredientProps> = ({ data, count, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "ingredient",
    item: { data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const image = <img src={data.image} alt={data.name} />;
  return (
    <div
      ref={dragRef}
      className={styles.ingridientsItem}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => onClick(data)}
    >
      <li>
        <div className={styles.img}>{image}</div>
        <p className={styles.name}>{data.name}</p>
        <p className={styles.description}>{`Price: ${data.price}`}</p>
      </li>
      <span>{count}</span> {/* Отображаем количество */}
    </div>
  );
};

interface BurgerIngredientsProps {
  ingredientCount: { [key: string]: number }; // Добавляем проп для счетчика ингредиентов
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
  ingredientCount,
}) => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [] as Product[],
  });

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((res) => res.json())
      .then((data) => setState({ ...state, data: data.data, isLoading: false }))
      .catch(() => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const { data, isLoading, hasError } = state;

  const [current, setCurrent] = useState("bun");

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const [bunInViewRef, bunInView] = useInView({ threshold: 0.3 });
  const [sauceInViewRef, sauceInView] = useInView({ threshold: 0.2 });
  const [mainInViewRef, mainInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (bunInView) {
      setCurrent("bun");
    } else if (sauceInView) {
      setCurrent("sauce");
    } else if (mainInView) {
      setCurrent("main");
    }
  }, [bunInView, sauceInView, mainInView]);

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

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalActive(true);
  };
  const handleModalClose = () => {
    setIsModalActive(false);
  };

  return (
    <section>
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
      <div className={styles.ingridients}>
        {isLoading && "Загрузка..."}
        {hasError && "Произошла ошибка"}
        {!isLoading && !hasError && (
          <>
            <div ref={bunRef} className={`mb-8`}>
              <div ref={bunInViewRef}>
                <h2
                  className={`text text_type_main-medium ${styles.ingridientTitle}`}
                >
                  Булки
                </h2>
                <ul className={styles.ingridientsContainer}>
                  {data
                    .filter((product) => product.type === "bun")
                    .map((product) => (
                      <Ingredient
                        key={product._id}
                        data={product}
                        count={ingredientCount[product._id] || 0}
                        onClick={handleProductClick}
                      />
                    ))}
                </ul>
              </div>
            </div>

            <div ref={sauceRef} className={`mt-10`}>
              <div ref={sauceInViewRef}>
                <h2
                  className={`text text_type_main-medium  ${styles.ingridientTitle}`}
                >
                  Соусы
                </h2>
                <ul className={styles.ingridientsContainer}>
                  {data
                    .filter((product) => product.type === "sauce")
                    .map((product) => (
                      <Ingredient
                        key={product._id}
                        data={product}
                        onClick={handleProductClick}
                        count={ingredientCount[product._id]}
                      />
                    ))}
                </ul>
              </div>
            </div>
            <div ref={mainRef}>
              <div ref={mainInViewRef}>
                <h2
                  className={`text text_type_main-medium ${styles.ingridientTitle}`}
                >
                  Начинки
                </h2>
                <ul className={styles.ingridientsContainer}>
                  {data
                    .filter((product) => product.type === "main")
                    .map((product) => (
                      <Ingredient
                        key={product._id}
                        data={product}
                        onClick={handleProductClick}
                        count={ingredientCount[product._id]}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
      <ProductDetailsModal
        product={selectedProduct}
        isActive={isModalActive}
        onClose={handleModalClose}
      />
    </section>
  );
};

export default BurgerIngredients;
