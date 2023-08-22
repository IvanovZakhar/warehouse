import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successfull, setSuccessfull] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); 
    const request = useCallback( async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json'}) => {
        setLoading(true);

        try {
          const response = await fetch(url, { method, body, headers });
      
          if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse?.error || 'Unknown error'; // Получение сообщения об ошибке или используйте другое поле, содержащее информацию об ошибке
            setErrorMessage(errorMessage);
            throw new Error(errorMessage);
          }
      
          const data = await response.json();
      
          setLoading(false);
          setError(null);
          return data;
        } catch (e) {
          setLoading(false);
          setError(e.message);
          throw e;
        }

    }, [])
 
    const clearError = useCallback(() => {
        setError(null);
        setErrorMessage(null); // Сброс сообщения об ошибке
      }, []);
    
  

    return {loading, request, error, clearError, successfull, errorMessage}

}