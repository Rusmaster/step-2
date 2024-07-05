import { useState, useEffect } from "react";
import { Product } from "./types";

// Функция сортировки с типизацией
const sortProducts = (products: Product[]): Product[] => {
  const order = ["bun", "sauce", "main"];
  return products
    .slice()
    .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
};

const useFetchProducts = () => {
  const [state, setState] = useState<{
    isLoading: boolean;
    hasError: boolean;
    data: Product[];
  }>({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    const fetchProducts = () => {
      setState({ isLoading: true, hasError: false, data: [] });
      fetch("https://norma.nomoreparties.space/api/ingredients")
        .then((res) => res.json())
        .then((data) =>
          setState({
            isLoading: false,
            hasError: false,
            data: sortProducts(data.data),
          })
        )
        .catch(() => setState({ isLoading: false, hasError: true, data: [] }));
    };
    fetchProducts();
  }, []);

  return state;
};

export default useFetchProducts;
