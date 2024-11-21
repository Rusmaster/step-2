import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../services/hooks"; // Хуки для работы с Redux
import { fetchIngredients } from "../../../services/ingredients/ingredientsActions";
import { Product } from "../../../types/Product";
import styles from "./styles.module.css";

const IngredientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Извлекаем параметр id из URL
  const dispatch = useAppDispatch(); // Хук для диспатча экшенов

  // Получаем продукты из хранилища, используем 'ingredients' вместо 'products'
  const {
    data: ingredients,
    isLoading,
    hasError,
  } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients()); // Загружаем ингредиенты, если их нет в состоянии
    }
  }, [dispatch, ingredients.length]);

  // Находим продукт по id
  const product = ingredients.find((item: Product) => item._id === id);

  if (isLoading) {
    return <div>Загрузка...</div>; // Показываем статус загрузки
  }

  if (hasError) {
    return <div>Ошибка при загрузке ингредиентов</div>; // Показываем статус ошибки
  }

  // Если продукт не найден
  if (!product) {
    return <div>Ингредиент не найден</div>;
  }

  return (
    <div className={styles.ingredientInfo}>
      <h1>Детали ингредиента</h1>
      <img
        className={styles.img}
        src={product.image_large}
        alt={product.name}
      />
      <h2>{product.name}</h2>
      <div className={styles.ingredientInfoBox}>
        <div>
          <div className={styles.textIngredient}>Калории, ккал</div>
          <div className={styles.textIngredient}>{product.calories}</div>
        </div>
        <div>
          <div className={styles.textIngredient}>Белки, г </div>
          <div className={styles.textIngredient}>{product.proteins} </div>
        </div>
        <div>
          <div className={styles.textIngredient}>Жиры, г </div>
          <div className={styles.textIngredient}>{product.fat} </div>
        </div>
        <div>
          <div className={styles.textIngredient}>Углеводы, г </div>
          <div className={styles.textIngredient}>{product.carbohydrates} </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientPage;
