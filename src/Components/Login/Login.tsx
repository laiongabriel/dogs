import { UserContextData } from "../../Types/globalTypes";
import React from "react";
import styles from "../../Styles/Login.module.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginLostPassword from "./LoginLostPassword";
import LoginResetPassword from "./LoginResetPassword";
import { userContext } from "../../UserContext";
import NotFound from "../Helper/NotFound";

const Login = () => {
   const { login }: UserContextData = React.useContext(userContext);
   if (login) return <Navigate to="/profile" />;

   return (
      <section className={styles.login}>
         <div className={styles.forms}>
            <Routes>
               <Route path="/" element={<LoginForm />} />
               <Route path="signup" element={<LoginCreate />} />
               <Route path="forgot" element={<LoginLostPassword />} />
               <Route path="reset" element={<LoginResetPassword />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </section>
   );
};

export default Login;
