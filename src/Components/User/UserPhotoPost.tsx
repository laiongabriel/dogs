import React from "react";
import styles from "../../Styles/User/UserPhotoPost.module.css";
import Input from "../Form/Input";
import Button from "../Form/Button";
import useForm from "../../Hooks/userForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
   const name = useForm("");
   const weight = useForm("number");
   const age = useForm("number");
   const [img, setImg] = React.useState<{ preview: string; raw: File }>();
   const { data, error, loading, request } = useFetch();
   const navigate = useNavigate();

   React.useEffect(() => {
      if (data) navigate("/profile");
   }, [data, navigate]);

   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("img", img!.raw);
      formData.append("nome", name.value);
      formData.append("peso", weight.value);
      formData.append("idade", age.value);

      const token = localStorage.getItem("token");
      const { url, options } = PHOTO_POST(formData, token!);
      request(url, options);
   }

   function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
      if (target.files) {
         setImg({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0],
         });
      }
   }

   return (
      <section className={`${styles.photoPost} animeLeft`}>
         <Head title="Post your photo" />

         <form onSubmit={handleSubmit}>
            <Input required label="Name" type="text" name="name" {...name} />
            <Input
               required
               label="Weight"
               type="number"
               name="weight"
               {...weight}
            />
            <Input required label="Age" type="number" name="age" {...age} />
            <input
               className={styles.file}
               required
               type="file"
               name="img"
               id="img"
               onChange={handleImgChange}
            />
            {loading ? (
               <Button disabled>Publishing...</Button>
            ) : (
               <Button>Publish</Button>
            )}
            {error && <Error error={error} />}
         </form>
         <div>
            {img?.preview && (
               <div
                  className={styles.preview}
                  style={{
                     backgroundImage: `url("${img.preview}")`,
                  }}
               ></div>
            )}
         </div>
      </section>
   );
};

export default UserPhotoPost;
