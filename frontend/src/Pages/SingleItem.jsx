import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ProfileNavbar from "../Components/ProfileNavbar";
import SingleItemContent from "../Components/SingleItem/SinglItemContent";
import SingleListInfo from "../Components/SingleItem/SingleListInfo";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
const SingleItem = () => {
  const { id } = useParams();
  const location = useLocation();
  const { title, price, address, images, beds, toilet, lat, long, receiver } =
    location.state;
  console.log(title, price, address, images, lat, long);

  const [details, setDetails] = useState({});
  const data = async () => {
    await axios
      .get(`http://localhost:8000/api/auth/getDetails/${id}`)
      .then((res) => {
        if (res.data) {
          setDetails(res.data);
        }
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    console.log(images);
    data();
  }, [id]);

  return (
    <div>
      <div className="container bg-light">
        <div className="row">
          <div className="col-7 border">
            <Navbar />
            <SingleItemContent
              title={title}
              address={address}
              price={price}
              details={details}
              images={images}
            />
          </div>
          <div className=" col-5 border bg-warning bg-opacity-25 ">
            <ProfileNavbar />
            <SingleListInfo
              details={details}
              bedroom={beds}
              toilet={toilet}
              lat={lat}
              long={long}
              postId={id}
              receiver={receiver}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
