import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingridient from "./ingridient.module.css";
import { Product } from "./types";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";

interface ProductDetailsModalProps {
  product: Product | null;
  isActive: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isActive,
  onClose,
}) => {
  if (!product) return null;

  return (
    <ModalWindow active={isActive} setActive={onClose}>
      <div>
        <div className={ingridient.ModalHeader}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
          <div className={`p-2`} style={{ cursor: "pointer" }}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <div>
          <div>
            <img src={product.image_large} alt={product.name} />
            <h3>{product.name}</h3>
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
                {product.calories}
              </li>
            </ul>
            <ul className={ingridient.modalContentUl}>
              <li
                className={`text text_type_main-default ${ingridient.modalContentLi}`}
              >
                Белки, г
              </li>
              <li className={ingridient.modalContentLi}>{product.proteins}</li>
            </ul>
            <ul className={ingridient.modalContentUl}>
              <li
                className={`text text_type_main-default ${ingridient.modalContentLi}`}
              >
                Жиры, г
              </li>
              <li
                className={`text text_type_main-default ${ingridient.modalContentLi}`}
              >
                {product.fat}
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
                {product.carbohydrates}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

export default ProductDetailsModal;
