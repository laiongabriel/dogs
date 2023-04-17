import UserHeaderNav from "./UserHeaderNav";
import styles from "../../Styles/User/UserHeader.module.css";
import React from "react";
import { useLocation } from "react-router-dom";

const UserHeader = () => {
   const [title, setTitle] = React.useState("");
   const { pathname } = useLocation();

   React.useEffect(() => {
      switch (pathname) {
         case "/profile/post":
            setTitle("Upload a photo");
            break;
         case "/profile/statistics":
            setTitle("Your statistics");
            break;
         default:
            setTitle("Your posts");
      }
   }, [pathname]);

   return (
      <header className={styles.header}>
         <h1 className="title">{title}</h1>
         <UserHeaderNav />
      </header>
   );
};

export default UserHeader;
