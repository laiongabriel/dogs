import React from "react";

const useFetch = () => {
   const [data, setData] = React.useState<any>(null);
   const [error, setError] = React.useState<string | null>(null);
   const [loading, setLoading] = React.useState(false);

   const request = React.useCallback(async (url: string, options: {}) => {
      let response = null;
      let json;
      try {
         setError(null);
         setLoading(true);
         response = await fetch(url, options);
         json = await response.json();
         if (!response.ok) throw new Error(json.message);
      } catch (error) {
         if (error instanceof Error) setError(error.message);
      } finally {
         setData(json);
         setLoading(false);
         return { response, json };
      }
   }, []);

   return {
      data,
      loading,
      error,
      request,
   };
};

export default useFetch;
