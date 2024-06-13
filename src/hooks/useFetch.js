import { useState, useEffect, useCallback } from "react";

import { config } from "../config";
import { useSelector } from "react-redux";
import { productSelector } from "../reducers/products/productsSlice";
const { apiUrl } = config;

const useFetch = ({ url: endPoint, fetchingFor, productId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { products } = useSelector(productSelector);

  const fetchData = useCallback(
    async (url) => {
      switch (fetchingFor) {
        case "productDetails":
        case "editProduct":
          // eslint-disable-next-line no-case-declarations
          const isProductAvailable = products.find(
            ({ id }) => productId === id
          );
          if (isProductAvailable) {
            setLoading(false);
            setData(isProductAvailable);
          }
          return;
        default:
      }

      try {
        const response = await fetch(`${apiUrl}/${url}`);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    },
    [fetchingFor, productId, products]
  );

  useEffect(() => {
    fetchData(endPoint);
  }, [endPoint, fetchData]);

  return [loading, error, data];
};

export default useFetch;
