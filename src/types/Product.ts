// src/types/Product.ts

export interface Product {
  _id: string;
  name: string;
  //type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  position?: "top" | "bottom"; // Добавьте позицию, если это необходимо
  type: "bun" | "sauce" | "main";
  uuid?: string; //Добавил свойство uuid
}
