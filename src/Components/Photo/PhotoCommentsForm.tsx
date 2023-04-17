import React from "react";
import { ReactComponent as Send } from "../../assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Error from "../Helper/Error";
import styles from "../../Styles/Photo/PhotoCommentsForm.module.css";

interface PhotoCommentsFormProps {
   id: number;
   setCommentList: React.Dispatch<
      React.SetStateAction<
         {
            comment_ID: string;
            comment_author: string;
            comment_content: string;
         }[]
      >
   >;
   single: boolean;
}

const PhotoCommentsForm = ({
   id,
   setCommentList,
   single,
}: PhotoCommentsFormProps) => {
   const [comment, setComment] = React.useState("");
   const { request, error, loading } = useFetch();
   const textArea = React.useRef<HTMLTextAreaElement>(null);

   async function handleSubmit(
      event:
         | React.FormEvent<HTMLFormElement>
         | React.KeyboardEvent<HTMLTextAreaElement>
   ) {
      event.preventDefault();
      if (!comment.length) return;
      setComment("");
      textArea.current!.disabled = true;
      const { url, options } = COMMENT_POST(id, { comment });
      const { response, json } = await request(url, options);
      if (response?.ok) {
         setCommentList((prevComments) => [...prevComments, json]);
      }
      textArea.current!.disabled = false;
      textArea.current!.focus();
   }

   return (
      <form
         className={`${styles.form} ${single ? styles.single : ""}`}
         onSubmit={handleSubmit}
      >
         <textarea
            className={styles.textarea}
            ref={textArea}
            id="comment"
            name="comment"
            placeholder={loading ? "Posting..." : "Write a comment!"}
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            onKeyDown={(event) => {
               if (event.key === "Enter" && !event.shiftKey)
                  handleSubmit(event);
            }}
         ></textarea>
         <button className={styles.button}>
            <Send />
         </button>
         <Error error={error} />
      </form>
   );
};

export default PhotoCommentsForm;
