import React from "react";
import ingridient from "./ingridient.module.css";
import { Product } from "./types";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import  IngredientDetails  from "./IngredientDetails";

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
      <IngredientDetails
        name={product.name}
        calories={product.calories}
        proteins={product.proteins}
        fat={product.fat}
        carbohydrates={product.carbohydrates}
        image_large={product.image_large}
      />
    </ModalWindow>
  );
};

export default ProductDetailsModal;
