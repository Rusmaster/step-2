import React from "react";
import ingridient from "./../ingridient.module.css";

interface IngredientDetailsProps {
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  image_large: string;
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
  image_large,
}) => {
  return (
    <div>
      <h2 className={`text text_type_main-large ${ingridient.titleModal}`}>Детали ингредиента</h2>
      <div className={ingridient.modalTitle}>
        <img className={ingridient.modalImage} src={image_large} alt={name} />
        <h3>{name}</h3>
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
            {calories}
          </li>
        </ul>
        <ul className={ingridient.modalContentUl}>
          <li
            className={`text text_type_main-default ${ingridient.modalContentLi}`}
          >
            Белки, г
          </li>
          <li className={ingridient.modalContentLi}>{proteins}</li>
        </ul>
        <ul className={ingridient.modalContentUl}>
          <li
            className={`text text_type_main-default ${ingridient.modalContentLi}`}
          >
            Жиры, г
          </li>
          <li className={ingridient.modalContentLi}>{fat}</li>
        </ul>
        <ul
          className={`text text_type_main-default ${ingridient.modalContentUl}`}
        >
          <li
            className={`text text_type_main-default ${ingridient.modalContentLi}`}
          >
            Углеводы, г
          </li>
          <li className={ingridient.modalContentLi}>{carbohydrates}</li>
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
