import Navbar from "../Components/Navbar";
import ProfileNavbar from "../Components/ProfileNavbar";
import ListCard from "../Components/ListCard";
import "../styles.css";
import ProfilePreview from "../Components/ProfilePreview";
import RegisterUser from "../Components/RegisterUser";
import img from "../bg2.png";
const Main = () => {
  return (
    <div className="container" style={{ overflow: "hidden;" }}>
      <div className="row">
        <div className="col-7">
          <RegisterUser />
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
          <ProfileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Main;
