import React from "react";
import { useDrag } from "react-dnd";
import ingridient from "./ingridient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Product } from "./types";
//import { addIngredient } from "../BurgerConstructor/services/actions";

const ProductItem: React.FC<{
  data: Product;
  onClick: (product: Product) => void;
}> = ({ data, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PRODUCT",
    item: { data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      className={`${ingridient.ingridientsItem} ${
        isDragging && ingridient.dragging
      }`}
      ref={drag}
      onClick={() => onClick(data)}
    >
      <img className="ml-2 mr-2" src={data.image} alt={data.name} />
      <div className={ingridient.priceBox}>
        <p className={`text text_type_main-default`}>{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`text text_type_main-default`}>{data.name}</h3>
    </li>
  );
};

export default ProductItem;
