import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Change() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [usernameError, setUsernameError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Username error changed ---------" + usernameError);
  }, [usernameError]);

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.id);

    let hasUsernameError = false;

    if (username) {
      console.log("You gave a new username, trying to update it");
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/updateProfile",
          {
            username: username,
            id: user.id,
          },
          { withCredentials: true }
        );
        console.log(res.data);
        if (res.data.message === "ok") {
          setUsernameError(false);
          user.username = username;
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          hasUsernameError = true;
          setUsernameError(true);
          console.log("Username already exists, pick another one");
        }
      } catch (error) {
        console.error("Error updating username:", error);
      }
    }

    if (email && !password) {
      console.log("You gave a new email, trying to change it: " + email);
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/updateProfile",
          {
            email: email,
            id: user.id,
          },
          { withCredentials: true }
        );
        if (res.data.message === "ok") {
          user.email = email;
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (error) {
        console.error("Error updating email:", error);
      }
    }

    if (password) {
      console.log("You gave a new password, trying to replace it");
    }

    if (user.avatar) {
      console.log("There is an avatar, you need to update it!");
      try {
        await axios.post(
          "http://localhost:8000/api/auth/updateProfile",
          {
            avatar: user.avatar,
            id: user.id,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }

    if (!hasUsernameError) {
      console.log("No error with username, redirecting...");
      navigate("/profile");
    } else {
      console.log("There was an error with the username, not redirecting.");
    }
  };

  return (
    <div
      className="container align-items-center d-flex flex-column justify-content-center gap-3"
      style={{ height: "90vh" }}
    >
      <div className="h3">
        <b>Update Profile</b>
      </div>
      <div className="">
        <label htmlFor="school">Username</label>
        <input
          type="text"
          id="username"
          className="form-control"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <label htmlFor="school">Email</label>
        <input
          type="text"
          id="email"
          className="form-control"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <label htmlFor="school">Password</label>
        <input
          type="password"
          id="school"
          className="form-control"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      {usernameError ? (
        <div className="alert alert-danger">
          Username already exists,choose another one
        </div>
      ) : null}
      <div className="btn btn-warning" onClick={handleSubmit}>
        Update
      </div>
    </div>
  );
}

export default Change;
