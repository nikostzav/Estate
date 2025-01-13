import ProfileNavbar from "../Components/ProfileNavbar";
import Navbar from "../Components/Navbar";
import SearchBar from "../Components/SearchBar";
import img from "../bg2.png";

const Index = () => {
  return (
    <div className="container">
      <div className="container">
        <div className="row">
          <div className="col-7">
            <Navbar />
            <SearchBar />
          </div>
          <div
            className="col-5 border"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <ProfileNavbar className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
