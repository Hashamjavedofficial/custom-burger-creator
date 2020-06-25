import { useEffect, useState } from "react";

const HttpHandler = (axios) => {
  const [error, setError] = useState(null);

  const reqInterceptor = axios.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = axios.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  return [error, errorHandler];
};

export default HttpHandler;
