import Navbar from "../Components/Navbar";
import ProfileNavbar from "../Components/ProfileNavbar";
import ListCard from "../Components/ListCard";
import "../styles.css";
import ProfilePreview from "../Components/ProfilePreview";
import RegisterUser from "../Components/RegisterUser";
import Messages from "../Components/Messages";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));
  let userId;
  useEffect(() => {
    if (user == null) return navigate("/login");
    userId = JSON.parse(user).id;
    console.log("User id from useEffect" + userId);
  }, [user]);

  const checkUser = () => {
    if (!user) return redirect("/login");
  };
  return (
    <div className="container">
      <div className="conatiner">
        <div className="row">
          <div className="col-7 ">
            {checkUser}
            <ProfilePreview />
          </div>
          <div className="col-5 border bg-warning bg-opacity-25">
            <ProfileNavbar />
            <Messages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
