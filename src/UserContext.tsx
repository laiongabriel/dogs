import React from "react";
import { TOKEN_POST, USER_GET, VALIDADTE_TOKEN_POST } from "./api";
import { useNavigate } from "react-router-dom";

export const userContext = React.createContext<any>(null);

export const UserStorage = ({ children }: any) => {
   const [data, setData] = React.useState(null);
   const [login, setLogin] = React.useState<boolean | null>(null);
   const [loading, setLoading] = React.useState(false);
   const [error, setError] = React.useState<string | null>(null);
   const navigate = useNavigate();

   const userLogout = React.useCallback(() => {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      localStorage.removeItem("token");
      navigate("/login");
   }, [navigate]);

   async function getUser(token: string) {
      const { url, options } = USER_GET(token);
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
      setLogin(true);
   }

   async function userLogin(username: string, password: string) {
      try {
         setError(null);
         setLoading(true);
         const { url, options } = TOKEN_POST({ username, password });
         const tokenResponse = await fetch(url, options);
         if (!tokenResponse.ok)
            throw new Error(`Error: ${tokenResponse.statusText}`);
         const { token } = await tokenResponse.json();
         window.localStorage.setItem("token", token);
         await getUser(token);
         navigate("/profile");
      } catch (error) {
         if (error instanceof Error) setError(error.message);
         setLogin(false);
      } finally {
         setLoading(false);
      }
   }

   React.useEffect(() => {
      async function autoLogin() {
         const token = localStorage.getItem("token");
         if (token) {
            try {
               setError(null);
               setLoading(true);
               const { url, options } = VALIDADTE_TOKEN_POST(token);
               const response = await fetch(url, options);
               if (!response.ok) throw new Error("Invalid token.");
               await getUser(token);
            } catch (error: any) {
               console.log(error);
               userLogout();
            } finally {
               setLoading(false);
            }
         } else setLogin(false);
      }
      autoLogin();
   }, [userLogout]);

   return (
      <userContext.Provider
         value={{ userLogin, userLogout, data, error, loading, login }}
      >
         {children}
      </userContext.Provider>
   );
};
