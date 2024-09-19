import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchOrderStatusThunk } from "../../services/order/orderSlice";
import {
    fetchOrderStatusThunk,
  selectOrderId,
  selectOrderDetails,
  selectOrderStatus,
} from "../../services/order/orderSlice";

const OrderTracker: React.FC = () => {
  const dispatch = useDispatch();
  const orderId = useSelector(selectOrderId); // Получаем ID заказа
  const orderDetails = useSelector(selectOrderDetails); // Получаем детали заказа
  const orderStatus = useSelector(selectOrderStatus); // Получаем статус заказа

  // Запрашиваем статус заказа при загрузке компонента
  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderStatusThunk(orderId));
    }
  }, [dispatch, orderId]);

  if (orderStatus === "loading") {
    return <p>Загрузка статуса заказа...</p>;
  }

  if (orderStatus === "failed") {
    return (
      <p>
        Не удалось загрузить информацию о заказе. Пожалуйста, попробуйте позже.
      </p>
    );
  }

  return (
    <div>
      <h2>Статус вашего заказа</h2>
      {orderDetails ? (
        <div>
          <p>Номер заказа: {orderDetails.order.number}</p>
          <p>Статус: {orderDetails.order.status}</p>
        </div>
      ) : (
        <p>Заказ не найден.</p>
      )}
    </div>
  );
};

export default OrderTracker;
