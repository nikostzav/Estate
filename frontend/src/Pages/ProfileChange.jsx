import React, { useEffect, useState } from "react";
import ProfilePreview from "../Components/ProfilePreview";
import ProfileNavbar from "../Components/ProfileNavbar";
import Messages from "../Components/Messages";
import { redirect, useNavigate } from "react-router-dom";
import Change from "../Components/Change";
import Navbar from "../Components/Navbar";
import ChangeProfile from "../Components/ChangeProfile";

function ProfileChange() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    if (user == null) return navigate("/login");
  }, [user]);

  const checkUser = () => {
    if (!user) return redirect("/login");
  };
  return (
    <div>
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-7">
              {checkUser}
              <Navbar />
              <Change />
            </div>
            <div className="col-5 border bg-warning bg-opacity-25">
              <ProfileNavbar />
              <ChangeProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileChange;
