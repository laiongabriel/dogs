import React from "react";
import styles from "../../Styles/Image.module.css";

interface ImageProps {
   alt: string;
   [x: string]: any;
}

const Image = ({ alt, ...props }: ImageProps) => {
   const [skeleton, setSkeleton] = React.useState(true);

   function handleLoad(event: React.SyntheticEvent<HTMLImageElement>) {
      setSkeleton(false);
      event.currentTarget.style.opacity = "1";
   }

   return (
      <div className={styles.wrapper}>
         {skeleton && <div className={styles.skeleton}></div>}
         <img onLoad={handleLoad} className={styles.img} {...props} alt={alt} />
      </div>
   );
};

export default Image;
