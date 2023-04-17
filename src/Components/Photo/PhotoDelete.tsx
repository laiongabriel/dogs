import styles from "../../Styles/Photo/PhotoDelete.module.css";
import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";

const PhotoDelete = ({ id }: { id: number }) => {
   const { loading, request } = useFetch();

   async function handleClick() {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
         const { url, options } = PHOTO_DELETE(id);
         const { response } = await request(url, options);
         if (response?.ok) window.location.reload();
      }
   }

   return (
      <>
         {loading ? (
            <button disabled className={styles.delete}>
               Deleting...
            </button>
         ) : (
            <button onClick={handleClick} className={styles.delete}>
               Delete
            </button>
         )}
      </>
   );
};

export default PhotoDelete;
