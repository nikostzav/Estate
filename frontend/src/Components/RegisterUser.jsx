import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
const RegisterUser = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    axios
      .post("http://localhost:8000/api/auth/register", {
        username: username,
        password: password,
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.message) {
          console.log("Created user successfulley");
          navigate("/login");
        } else {
          setError(true);
        }
      });
    //navigate("/login"); //replace with login page when you create it
  };

  return (
    <div
      className="container d-flex flex-column justify-content-between "
      style={{ height: "100vh" }}
    >
      <Navbar />
      <div className="container-fluid mt-5 d-flex justify-content-center flex-column gap-4 align-items-center">
        <div className="h2">Create an account</div>
        <div className="container d-flex flex-column gap-3 w-50">
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="btn btn-success"
            onClick={(e) => {
              handleSubmit();
            }}
          >
            Register
          </div>
          <Link to="/login">
            <p className="text-start">
              <u>Do you have an account? </u>
            </p>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default RegisterUser;
