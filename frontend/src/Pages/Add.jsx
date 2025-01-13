import { useNavigate } from "react-router-dom";
import AddPost from "../Components/AddPost";
import Navbar from "../Components/Navbar";
import ProfileNavbar from "../Components/ProfileNavbar";
import { useEffect, useState } from "react";
import UploadWidget from "../Components/uploadWidget/UploadWidget.jsx";
import UploadWidgetMultiple from "../Components/uploadWidget/UploadWidgetMultiple.jsx";

const Add = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  function checkUser() {
    if (localStorage.getItem("user") == null) {
      console.log("User not logged in");
      navigate("/login");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      setUsername(user.username);
      console.log(user.username);
    }
  }

  const [images, setImages] = useState([]);

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div>
      {checkUser}
      <div className="container" style={{ overflowY: "hidden" }}>
        <div className="row">
          <div
            className="col-7"
            style={{ height: "100vh", overflowY: "scroll" }}
          >
            <Navbar />
            <AddPost images={images} />
          </div>
          <div className="col-5 border bg-warning bg-opacity-25">
            <ProfileNavbar />
            <div
              className="container border-black d-flex flex-column align-items-center justify-content-center gap-3"
              style={{ height: "90vh", overflowY: "scroll" }}
            >
              {images.map((image, index) => {
                {
                  console.log(image);

                  return (
                    <img
                      key={index}
                      src={image}
                      style={{
                        height: "170px",
                        width: "250px",
                        borderRadius: "15px",
                      }}
                    ></img>
                  );
                }
              })}
              <UploadWidgetMultiple
                uwConfig={{
                  cloudName: "drcgbkm5u",
                  uploadPreset: "estate",
                  multiple: true,
                  maxImageFileSize: 2000000,
                  folder: { username },
                }}
                setState={setImages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
