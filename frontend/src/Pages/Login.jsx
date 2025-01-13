import { useEffect } from "react";
import LoginComp from "../Components/LoginComp";
import ProfileNavbar from "../Components/ProfileNavbar";
import img from "../bg2.png";
import axios from "axios";

const Login = () => {
  const logout = async () => {
    localStorage.clear();
    await axios
      .post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        console.log("Requested logout!");
      });
  };
  useEffect(() => {
    logout();
  }, [logout]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-7">
          <LoginComp />
        </div>
        <div
          className="col-5 border bg-warning bg-opacity-25"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <ProfileNavbar loginPage={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;
