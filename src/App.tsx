import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./UserContext";
import ScrollTop from "./Components/ScrollTop";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import User from "./Components/User/User";
import Photo from "./Components/Photo/Photo";
import UserProfile from "./Components/User/UserProfile";
import NotFound from "./Components/Helper/NotFound";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <UserStorage>
               <ScrollTop />
               <Header />
               <main className="AppBody">
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="login/*" element={<Login />} />
                     <Route
                        path="profile/*"
                        element={
                           <ProtectedRoute>
                              <User />
                           </ProtectedRoute>
                        }
                     />
                     <Route path="photo/:id" element={<Photo />} />
                     <Route path="user/:user" element={<UserProfile />} />
                     <Route path="*" element={<NotFound />} />
                  </Routes>
               </main>
               <Footer />
            </UserStorage>
         </BrowserRouter>
      </div>
   );
}

export default App;
