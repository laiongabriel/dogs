import { Route, Routes } from "react-router-dom";
import UserHeader from "./UserHeader";
import Feed from "../Feed/Feed";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";
import React from "react";
import { userContext } from "../../UserContext";
import { UserData } from "../../Types/globalTypes";
import NotFound from "../Helper/NotFound";
import Head from "../Helper/Head";

const User = () => {
   const { data }: UserData = React.useContext(userContext);

   return (
      <section className="container">
         <Head title={data.nome} />

         <UserHeader />
         <Routes>
            <Route path="/" element={<Feed user={data.id} />} />
            <Route path="post" element={<UserPhotoPost />} />
            <Route path="statistics" element={<UserStats />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </section>
   );
};

export default User;
