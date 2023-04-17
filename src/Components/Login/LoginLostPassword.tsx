import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/userForm";
import { PASSWORD_LOST } from "../../api";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginLostPassword = () => {
   const login = useForm("");
   const { data, loading, error, request } = useFetch();

   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (login.validate()) {
         const { url, options } = PASSWORD_LOST({
            login: login.value,
            url: window.location.href.replace("forgot", "reset"),
         });
         request(url, options);
      }
   }

   return (
      <section className="animeLeft">
         <Head title="Lost password" />
         <h1 className="title">Lost your password?</h1>
         {data ? (
            <p style={{ color: "#4c1" }}>{data}</p>
         ) : (
            <form onSubmit={handleSubmit}>
               <Input label="Email/User" type="text" name="email" {...login} />
               {loading ? (
                  <Button disabled>Sending...</Button>
               ) : (
                  <Button>Send email</Button>
               )}
            </form>
         )}

         {error && <Error error={error} />}
      </section>
   );
};

export default LoginLostPassword;
