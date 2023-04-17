import React from "react";
import { UserData } from "../../Types/globalTypes";
import { Link } from "react-router-dom";
import styles from "../../Styles/Photo/PhotoContent.module.css";
import { Photo } from "../../Types/globalTypes";
import PhotoComments from "./PhotoComments";
import { userContext } from "../../UserContext";
import PhotoDelete from "./PhotoDelete";
import Image from "../Helper/Image";

interface PhotoContentProps {
   data: Photo;
   single?: boolean;
}

const PhotoContent = ({ data, single }: PhotoContentProps) => {
   const user: UserData = React.useContext(userContext);
   const { photo, comments } = data;

   return (
      <div className={`${styles.photo} ${single ? styles.single : ""}`}>
         <div className={styles.img}>
            <Image src={photo.src} alt={photo.title} />
         </div>
         <div className={styles.details}>
            <div>
               <p className={styles.author}>
                  {user.data && user.data.username === photo.author ? (
                     <PhotoDelete id={photo.id} />
                  ) : (
                     <Link to={`/user/${photo.author}`}>@{photo.author}</Link>
                  )}
                  <span className={styles.views}>{photo.acessos}</span>
               </p>
               <h1 className="title">
                  <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
               </h1>
               <ul className={styles.attributes}>
                  <li>{photo.peso} kg</li>
                  <li>
                     {photo.idade}{" "}
                     {Number(photo.idade) > 1 ? "years old" : "year old"}
                  </li>
               </ul>
            </div>
         </div>
         <PhotoComments id={photo.id} comments={comments} single={single!} />
      </div>
   );
};

export default PhotoContent;
