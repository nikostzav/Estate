import { useEffect, useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import img from "../no_avatar.png";
const ProfileNavbar = (props) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [user]);
  return (
    <div
      className="d-flex flex-row-reverse gap-1 align-items-center bg-light "
      style={{ height: "50px" }}
    >
      {user && !props.loginPage ? (
        <>
          <Link to="/profile">
            <div className="btn btn-outline-warning mx-3 text-dark">
              Profile
            </div>
          </Link>
          <div className="fs-4">{JSON.parse(user).username}</div>
          {/* <div className="mx-3 fs-2"><i className="bi bi-bootstrap"></i></div> */}
          <div
            className="mx-3"
            style={{
              backgroundImage: `url(${JSON.parse(user).avatar || img})`,
              width: "35px",
              height: "35px",
              backgroundSize: "100% 100%",
              borderRadius: "50%",
              border: "1px solid black",
            }}
          ></div>
        </>
      ) : (
        <>
          <Link to="/login">
            <div className="btn btn-warning mx-3 px-3">Sign in</div>
          </Link>
          <Link to="/register">
            <div className="mx-3  btn btn-outline-warning text-dark px-3">
              Sign up
            </div>
          </Link>
          {/* <div className="fs-3"><a href='/login'>Sign in</a></div></> */}
        </>
      )}
    </div>
  );
};

export default ProfileNavbar;
