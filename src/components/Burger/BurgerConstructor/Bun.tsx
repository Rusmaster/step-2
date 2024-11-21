import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Product } from "../../../types/Product";
import styles from "./styles.module.css";

// Bun Component
const Bun: React.FC<{ bun: Product | null; type: "top" | "bottom" }> = ({
  bun,
  type,
}) => {
  return (
    <div className={styles.bun}>
      {bun && (
        // <div className={styles.ingredientItem}>
        // <img src={bun.image} alt={bun.name} className={styles.img} />
        //<p className={styles.name}>{bun.name}</p>
        //    </div>
        <>
          <ConstructorElement
            isLocked={true}
            //   text={`${bun.name} (верх)`}
            text={`${bun.name} (${type === "top" ? "top" : "bottom"})`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </>
      )}
    </div>
  );
};
export default Bun;
