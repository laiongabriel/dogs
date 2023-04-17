import React from "react";
import { userContext } from "../../UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "../../Styles/Photo/PhotoComments.module.css";

interface PhotoCommentsProps {
   id: number;
   comments: {
      comment_ID: string;
      comment_author: string;
      comment_content: string;
   }[];
   single: boolean;
}

const PhotoComments = ({ id, comments, single }: PhotoCommentsProps) => {
   const [commentList, setCommentList] = React.useState(() => comments);
   const commentsSection = React.useRef<HTMLUListElement>(null);
   const { login } = React.useContext(userContext);

   React.useEffect(() => {
      if (commentsSection.current)
         commentsSection.current.scrollTop =
            commentsSection.current.scrollHeight;
   }, [comments]);

   return (
      <>
         <ul
            ref={commentsSection}
            className={`${styles.comments} ${single ? styles.single : ""}`}
         >
            {commentList.map((comment) => (
               <li key={comment.comment_ID}>
                  <strong>{comment.comment_author}: </strong>
                  <span>{comment.comment_content}</span>
               </li>
            ))}
         </ul>
         {login && (
            <PhotoCommentsForm
               single={single}
               id={id}
               setCommentList={setCommentList}
            />
         )}
      </>
   );
};

export default PhotoComments;
