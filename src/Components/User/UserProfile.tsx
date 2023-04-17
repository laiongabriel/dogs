import { useParams } from "react-router-dom";
import Feed from "../Feed/Feed";
import Head from "../Helper/Head";

const UserProfile = () => {
   const { user } = useParams();

   if (user)
      return (
         <section className="container mainSection">
            <Head title={user} />
            <h1 className="title">{user}'s posts</h1>
            <Feed user={user} />
         </section>
      );
   else return null;
};

export default UserProfile;
