import React from "react";
import styles from "../../Styles/User/UserHeaderNav.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { userContext } from "../../UserContext";
import MyPhotos from "../../assets/feed.svg";
import Statistics from "../../assets/estatisticas.svg";
import AddPhoto from "../../assets/adicionar.svg";
import Logout from "../../assets/sair.svg";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
   const [mobileMenu, setMobileMenu] = React.useState(false);
   const { userLogout } = React.useContext(userContext);
   const mobile = useMedia("(max-width: 40rem)");
   const { pathname } = useLocation();

   React.useEffect(() => {
      setMobileMenu(false);
   }, [pathname]);

   return (
      <>
         {mobile && (
            <button
               aria-label="Menu"
               className={`${styles.mobileButton} ${
                  mobileMenu && styles.mobileButtonActive
               }`}
               onClick={() => setMobileMenu(!mobileMenu)}
            ></button>
         )}
         <nav
            className={`${mobile ? styles.navMobile : styles.nav} ${
               mobileMenu && styles.navMobileActive
            }`}
         >
            <NavLink to="/profile" end>
               <img src={MyPhotos} alt="My Photos" title="My Photos" />
               {mobile && "My Photos"}
            </NavLink>
            <NavLink to="/profile/statistics">
               <img
                  src={Statistics}
                  alt="My Statistics"
                  title="My Statistics"
               />
               {mobile && "My Statistics"}
            </NavLink>
            <NavLink to="/profile/post">
               <img src={AddPhoto} alt="Add" title="Add Photo" />
               {mobile && "Add Photo"}
            </NavLink>
            <button onClick={userLogout}>
               <img src={Logout} alt="Log out" title="Log out" />
               {mobile && "Log out"}
            </button>
         </nav>
      </>
   );
};

export default UserHeaderNav;
