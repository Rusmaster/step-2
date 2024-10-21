import React from "react";
import { Product } from "../../../types/Product";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import IngredientDetails from "./IngredientDetails";
import { useNavigate } from "react-router-dom"; 
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
  const navigate = useNavigate();

  const handleIngredientClick = () => {
    if (product) {
      navigate(`/ingredients/${product._id}`);
    }
  };
  if (!product) return null;

  return (
    <ModalWindow active={isActive} setActive={onClose}>
      <div onClick={handleIngredientClick}>
      <IngredientDetails
        name={product.name}
        calories={product.calories}
        proteins={product.proteins}
        fat={product.fat}
        carbohydrates={product.carbohydrates}
        image_large={product.image_large}
      />
      </div>
    </ModalWindow>
  );
};
export default ProductDetailsModal;
