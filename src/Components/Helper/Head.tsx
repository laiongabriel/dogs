import React from "react";

interface HeadProps {
   title: string;
   description?: string;
}

const Head = ({ title, description }: HeadProps) => {
   React.useEffect(() => {
      document.title = title + " | Dogs";
      document
         .querySelector("meta[name='description'")
         ?.setAttribute("content", description || "");
   }, [description, title]);

   return <></>;
};

export default Head;
