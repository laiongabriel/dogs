import styles from "../../Styles/Form/Button.module.css";

interface ButtonProps {
   children: string;
   disabled?: boolean;
}

const Button = ({ children, disabled }: ButtonProps) => {
   return (
      <button disabled={disabled} className={styles.button}>
         {children}
      </button>
   );
};

export default Button;
