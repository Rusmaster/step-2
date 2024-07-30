import React from "react";
import styles from "./styles.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const TotalPrice: React.FC<{ total: number }> = ({ total }) => {
  return (
    <div className={styles.totalPrice}>
      <p className="text text_type_digits-medium">{total}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default TotalPrice;
