import { NavLink } from "react-router-dom";
import styles from "../Styles/Header.module.css";
import Dogs from "../assets/dogs.svg";
import React from "react";
import { userContext } from "../UserContext";

const Header = () => {
   const {
      data,
   }: {
      data: {
         nome: string;
      };
   } = React.useContext(userContext);

   return (
      <header className={styles.header}>
         <nav className={`${styles.nav} + container`}>
            <NavLink className={styles.logo} to="/" aria-label="Dogs - Home">
               <img src={Dogs} alt="Dogs" />
            </NavLink>
            {data ? (
               <NavLink className={styles.login} to="/profile">
                  {data.nome}
               </NavLink>
            ) : (
               <NavLink className={styles.login} to="/login">
                  Login
               </NavLink>
            )}
         </nav>
      </header>
   );
};

export default Header;
