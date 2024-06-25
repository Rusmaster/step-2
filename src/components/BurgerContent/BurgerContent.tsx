import BurgerConstructor from "./BurgerConstructor";
import BurgerIngredients from "./BurgerIngredients";
import styles from "./styles.module.css";

const BurgerContent = () => {
  return (
    <div className={styles.burgerContent}>
      <div>
        <BurgerIngredients />
      </div>
      <div>
        <BurgerConstructor />
      </div>
    </div>
  );
};
export default BurgerContent;
