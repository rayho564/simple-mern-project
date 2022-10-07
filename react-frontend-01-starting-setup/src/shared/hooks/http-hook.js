import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // useRef will not create a new one when it rerenders, stores data between each active cycle
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          // Now we could use httpAbortCtrl to cancel the requests
          signal: httpAbortCtrl.signal
        });

        // parse it into json
        const responseData = await response.json();

        // Remove old request controller
        activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

    const clearError = () => {
        setError(null);
    };

    // we're using this as a clean up
    // Never continue a request that is on it's way out when we're switching our way out of the component
    useEffect(()=>{
        // first runs when component is used or unmounts
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError
  };
};
