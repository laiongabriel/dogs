import { PhotoList } from "../../Types/globalTypes";
import React from "react";
import useFetch from "../../Hooks/useFetch";
import FeedPhotosItem from "./FeedPhotosItem";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import styles from "../../Styles/Feed/FeedPhotos.module.css";
import Loading from "../Helper/Loading";

interface FeedPhotosProps {
   setModalPhoto: React.Dispatch<React.SetStateAction<PhotoList | null>>;
   user: number | string;
   page: number;
   setInfinite: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UseFetchProps {
   data: PhotoList[];
   loading: boolean;
   error: string | null;
   request: (
      url: string,
      options: {}
   ) => Promise<{
      response: Response | null;
      json: any;
   }>;
}

const FeedPhotos = ({
   setModalPhoto,
   setInfinite,
   user,
   page,
}: FeedPhotosProps) => {
   const { data, error, request, loading }: UseFetchProps = useFetch();

   React.useEffect(() => {
      async function fetchPhotos() {
         const total = 6;
         const { url, options } = PHOTOS_GET({ page, total, user });
         const { response, json } = await request(url, options);
         console.log(json);
         if ((response!.ok && json.length < total) || json.length === 0)
            setInfinite(false);
      }
      fetchPhotos();
   }, [request, user, page, setInfinite]);

   if (loading) return <Loading />;
   if (error) return <Error error={error} />;
   if (data)
      return (
         <>
            {!data.length ? (
               <h1>You haven't posted any photos yet.</h1>
            ) : (
               <ul className={`${styles.feed} animeLeft`}>
                  {data.map((photo) => (
                     <FeedPhotosItem
                        key={photo.id}
                        photo={photo}
                        setModalPhoto={setModalPhoto}
                     />
                  ))}
               </ul>
            )}
         </>
      );
   else return null;
};

export default FeedPhotos;
