import { PhotoList } from "../../Types/globalTypes";
import styles from "../../Styles/Feed/FeedPhotosItem.module.css";
import Image from "../Helper/Image";

type FeedPhotosItemProps = {
   photo: PhotoList;
   setModalPhoto: React.Dispatch<React.SetStateAction<PhotoList | null>>;
};

const FeedPhotosItem = ({ photo, setModalPhoto }: FeedPhotosItemProps) => {
   function handleClick() {
      setModalPhoto(photo);
   }

   return (
      <li className={styles.photo} onClick={handleClick}>
         <Image src={photo.src} alt={photo.title} />
         <span className={styles.acessos}>{photo.acessos}</span>
      </li>
   );
};

export default FeedPhotosItem;
