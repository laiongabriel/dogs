import React from "react";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import styles from "../../Styles/Feed/FeedModal.module.css";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import { PhotoList } from "../../Types/globalTypes";

type FeedModalProps = {
   photo: PhotoList;
   setModalPhoto: React.Dispatch<React.SetStateAction<PhotoList | null>>;
};

const FeedModal = ({ photo, setModalPhoto }: FeedModalProps) => {
   const { data, error, loading, request } = useFetch();

   React.useEffect(() => {
      const { url, options } = PHOTO_GET(photo.id);
      request(url, options);
   }, [photo, request]);

   function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
      if (event.target === event.currentTarget) setModalPhoto(null);
   }

   return (
      <div className={styles.modal} onClick={handleOutsideClick}>
         {error && <Error error={error} />}
         {loading && <Loading />}
         {data && <PhotoContent data={data} />}
      </div>
   );
};

export default FeedModal;
