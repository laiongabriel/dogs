import { UserContextData } from "../../Types/globalTypes";
import React from "react";
import { userContext } from "../../UserContext";
import { Link } from "react-router-dom";
import styles from "../../Styles/Form/LoginForm.module.css";
import stylesBtn from "../../Styles/Form/Button.module.css";
import Input from "../Form/Input";
import Button from "../Form/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/userForm";
import Head from "../Helper/Head";

const LoginForm = () => {
   const username = useForm("");
   const password = useForm("");
   const { userLogin, error, loading }: UserContextData =
      React.useContext(userContext);

   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (username.validate() && password.validate()) {
         userLogin(username.value, password.value);
      }
   }

   return (
      <section className="animeLeft">
         <Head title="Login" />
         <h1 className="title">Login</h1>
         <form className={styles.form} onSubmit={handleSubmit}>
            <Input
               required
               label="User"
               type="text"
               name="username"
               {...username}
            />
            <Input
               required
               label="Password"
               type="password"
               name="password"
               {...password}
            />

            {loading ? (
               <Button disabled>Logging in...</Button>
            ) : (
               <Button>Log in</Button>
            )}
            {error && <Error error={"Incorrect information."} />}
         </form>

         <Link className={styles.forgot} to="/login/forgot">
            Forgot your password?
         </Link>

         <div className={styles.signup}>
            <h2 className={styles.subtitle}>Sign up</h2>
            <p>Don't have an account yet? Sign up now!</p>
            <Link className={stylesBtn.button} to="/login/signup">
               Sign-up
            </Link>
         </div>
      </section>
   );
};

export default LoginForm;
