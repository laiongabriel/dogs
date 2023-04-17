import { UserContextData } from "../../Types/globalTypes";
import React from "react";
import Error from "../Helper/Error";
import Input from "../Form/Input";
import Button from "../Form/Button";
import useForm from "../../Hooks/userForm";
import useFetch from "../../Hooks/useFetch";
import { userContext } from "../../UserContext";
import { USER_POST } from "../../api";
import Head from "../Helper/Head";

const LoginCreate = () => {
   const username = useForm("");
   const email = useForm("email");
   const password = useForm("");
   const { userLogin }: UserContextData = React.useContext(userContext);
   const { loading, error, request } = useFetch();

   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const { url, options } = USER_POST({
         username: username.value,
         email: email.value,
         password: password.value,
      });
      const { response } = await request(url, options);
      if (response!.ok) userLogin(username.value, password.value);
   }

   return (
      <section className="animeLeft">
         <Head title="Sign up" />
         <h1 className="title">Sign up</h1>
         <form onSubmit={handleSubmit}>
            <Input
               required
               label="User"
               type="text"
               name="username"
               {...username}
            />
            <Input
               required
               label="Email"
               type="email"
               name="email"
               {...email}
            />
            <Input
               required
               label="Password"
               type="password"
               name="password"
               {...password}
            />
            {loading ? (
               <Button disabled>Registering...</Button>
            ) : (
               <Button>Sign up</Button>
            )}
            <Error error={error} />
         </form>
      </section>
   );
};

export default LoginCreate;
