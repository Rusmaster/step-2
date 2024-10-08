import React, { useEffect } from "react"; 
import CheckMark from "./SVG/CheckMark";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./styles.module.css";

interface OrderDetailsProps {
  orderId: string | null;
  totalPrice: number;
  orderStatus: "idle" | "loading" | "succeeded" | "failed";
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderId,
  totalPrice,
  orderStatus
}) => {
  useEffect(() => {
    console.log("Order ID in OrderDetails:", orderId);
  }, [orderId]);

  return (
    <>
      {/* Проверка статуса и orderId */}
      {orderStatus === "loading" && <p>Загрузка...</p>}
      {orderStatus === "succeeded" && orderId ? (
        <>
          <p className="mt-8 text text_type_digits-large">{orderId}</p>
          <p>Ваш заказ № {orderId} оформлен!</p>
        </>
      ) : (
        orderStatus === "failed" && <p>Ошибка при оформлении заказа</p>
      )}

      <p className="mb-10 text text_type_main-medium">Идентификатор заказа</p>

      {/* Общая стоимость */}
      <div className={style.price}>
        <div>
          <p>Стоимость заказа: </p>{" "}
        </div>{" "}
        <div className={style.priceBox}>
          <p>{totalPrice}</p>
          <div className="mt-3">
            <CurrencyIcon type="primary" />
          </div>{" "}
        </div>
      </div>

      <div>
        <CheckMark />
      </div>

      {/* Дополнительные сообщения */}
      <p className="mt-10 text text_type_main-small">
        Ваш заказ начали готовить
      </p>
      <p className="mt-2 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
