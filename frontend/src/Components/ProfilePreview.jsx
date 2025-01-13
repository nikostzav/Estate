import ListCard from "./ListCard";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { listData } from "../lib/dummydata";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const ProfilePreview = () => {
  const data = listData;
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios
      .post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        console.log("Requested logout!");
        localStorage.clear();
        navigate("/login");
      });
  };

  const [user, setUser] = useState(localStorage.getItem("user"));
  const [savedPosts, setSavedPostsId] = useState([]);

  const getPosts = async () => {
    const id = JSON.parse(user).id;
    console.log("Id from profile page: " + id);
    await axios
      .get(`http://localhost:8000/api/auth/getUserPost/${id}`)
      .then((response) => {
        setPosts(response.data);
        console.log("Respones data from profile page: " + response.data);
      })
      .catch((err) => console.log(err));
  };

  const getSavedPosts = async () => {
    const id = JSON.parse(user).id;
    await axios
      .post(`http://localhost:8000/api/auth/getSavedPosts`, {
        id: id,
      })
      .then((res) => {
        setSavedPostsId(res.data);
        console.log("Saved posts : " + res.data);
      });
  };

  useEffect(() => {
    getPosts();
    getSavedPosts();
  }, []);

  return (
    <div style={{ overflowY: "scroll", maxHeight: "100vh" }}>
      <Navbar />
      <div className="d-flex justify-content-between align-items-center">
        <div className="mt-3 mx-5 fs-2">User Information</div>
        <Link to="/profileChange">
          <div className="btn mx-3 mt-3 btn-warning">Update Profile</div>
        </Link>
      </div>
      <div className="mt-5 d-flex flex-column gap-3 text-start mx-5 ">
        <div className="d-flex gap-3 align-items-center ">
          <div>Avatar :</div>

          {JSON.parse(user).avatar ? (
            <div
              className="border border-black "
              style={{
                borderRadius: "50%",
                height: "60px",
                width: "60px",
                backgroundImage: `url(${JSON.parse(user).avatar})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          ) : (
            <i className="bi bi-bootstrap mx-2"></i>
          )}
        </div>
        <div className="d-flex gap-1 align-items-center">
          Username :{" "}
          <h6 className="font-italic mx-3 mt-2 ">
            {user ? JSON.parse(user).username : null}
          </h6>
        </div>
        <div className="d-flex gap-1 align-items-center">
          Email :{" "}
          <h6 className="font-italic mx-3  mt-2 ">
            {user ? JSON.parse(user).email : null}
          </h6>
        </div>

        <div>
          <div className="btn btn-secondary px-4" onClick={handleLogout}>
            Logout
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex justify-content-between">
            <div className="fs-1">My List</div>
            <Link to="/add">
              <div className="btn btn-warning fs-5 p-3">Create New</div>
            </Link>
          </div>
        </div>
        <div>
          {posts.map((d, index) => {
            return (
              <ListCard
                key={index}
                img={d.images[0]}
                title={d.title}
                price={d.price}
                bedrooms={d.bedroom}
                bathrooms={d.bathroom}
                address={d.address}
                images={d.images}
                lat={d.latitude}
                long={d.longitude}
                redirect={true}
                id={d.id}
                receiver={d.userid}
              />
            );
          })}
        </div>
        <div className="fs-1">Saved Posts</div>
        {savedPosts.map((post, index) => {
          return (
            <ListCard
              key={index}
              img={post.images[0]}
              title={post.title}
              price={post.price}
              bedrooms={post.bedroom}
              bathrooms={post.bathroom}
              address={post.address}
              images={post.images}
              lat={post.latitude}
              long={post.longitude}
              redirect={true}
              id={post.id}
              receiver={post.userid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePreview;
