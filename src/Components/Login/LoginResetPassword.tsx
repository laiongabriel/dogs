import React from "react";
import Input from "../Form/Input";
import useForm from "../../Hooks/userForm";
import Button from "../Form/Button";
import { PASSWORD_RESET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const LoginResetPassword = () => {
   const [login, setLogin] = React.useState("");
   const [key, setKey] = React.useState("");
   const password = useForm("password");
   const { error, loading, request } = useFetch();
   const navigate = useNavigate();

   React.useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const key = params.get("key");
      const login = params.get("login");

      if (key) setKey(key);
      if (login) setLogin(login);
   }, []);

   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (password.validate()) {
         const { url, options } = PASSWORD_RESET({
            login,
            key,
            password: password.value,
         });
         const { response } = await request(url, options);
         if (response?.ok) navigate("/login");
      }
   }

   return (
      <section className="animeLeft">
         <Head title="Reset your password" />
         <h1 className="title">Reset your password</h1>
         <form onSubmit={handleSubmit}>
            <Input
               label="New password"
               type="password"
               name="password"
               {...password}
            />
            {loading ? (
               <Button disabled>Resetting...</Button>
            ) : (
               <Button>Reset password</Button>
            )}
         </form>
         {error && <Error error={error} />}
      </section>
   );
};

export default LoginResetPassword;
