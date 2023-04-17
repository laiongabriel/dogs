import styles from "../../Styles/Form/Input.module.css";

interface InputProps {
   label: string;
   type: string;
   name: string;
   value: string;
   error: string | null;
   onChange?: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
   onBlur?: React.FocusEventHandler<HTMLInputElement>;
   required?: boolean;
}

const Input = ({ ...props }: InputProps) => {
   return (
      <div className={styles.wrapper}>
         <label htmlFor={props.name} className={styles.label}>
            {props.label}
         </label>
         <input
            className={styles.input}
            type={props.type}
            id={props.name}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            required={props.required}
         />
         {props.error && <p className={styles.error}>{props.error}</p>}
      </div>
   );
};

export default Input;
