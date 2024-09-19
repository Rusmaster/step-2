// services/api.ts
import axios from "axios";
import { BASE_URL } from "../constants";
//export const BASE_URL = "https://norma.nomoreparties.space/api";
import { Product } from "../../types/Product";

// Тип ингредиента
export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
}

// Тип данных, которые отправляем на сервер
export interface OrderData {
  ingredients: Product[];
}

// Тип данных ответа от сервера
export interface OrderResponse {
  name: string;
  order: {
    number: number; // Номер заказа
  };
}

// Функция для отправки заказа
export const sendOrder = async (
  orderData: OrderData
): Promise<OrderResponse> => {
  const response = await axios.post<OrderResponse>(`${BASE_URL}/orders`, {
    ingredients: orderData.ingredients.map((item) => item._id),
  });
  return response.data;
};
