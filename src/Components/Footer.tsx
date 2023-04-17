import styles from "../Styles/Footer.module.css";
import { ReactComponent as Dogs } from "../assets/dogs-footer.svg";

const Footer = () => {
   return (
      <footer className={styles.footer}>
         <Dogs />
         <p>Dogs. Some rights reserved.</p>
      </footer>
   );
};

export default Footer;
