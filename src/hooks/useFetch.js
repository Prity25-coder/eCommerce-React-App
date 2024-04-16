import { useState, useEffect, useCallback } from "react";

import { config } from "../config";
const { apiUrl } = config;

const useFetch = (endPoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(`${apiUrl}/${url}`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(endPoint);
  }, [endPoint, fetchData]);

  return [loading, error, data];
};

export default useFetch;
