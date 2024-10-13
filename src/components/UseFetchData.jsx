import { useEffect, useState } from "react";

const UseFetchData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const result = await res.json();
      setApiData(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error, "error");
      setServerError(error);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    apiData,
    serverError,
    setApiData,
  };
};

export default UseFetchData;
