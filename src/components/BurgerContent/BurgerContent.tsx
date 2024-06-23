import BurgerConstructor from "./BurgerConstructor";
import BurgerIngridients from "./BurgerIngredients";
import styles from "./styles.module.css";

const BurgerContent = () => {
  return (
    <div className={styles.burgerContent}>
      <div>
        <BurgerIngridients />
      </div>
      <div>
        <BurgerConstructor />
      </div>
    </div>
  );
};
export default BurgerContent;
