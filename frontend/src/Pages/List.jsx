import "../styles.css";
import ProfileNavbar from "../Components/ProfileNavbar";
import ListComp from "../Components/ListComp";
import Map from "../Components/map/Map";
import { listData } from "../lib/dummydata";
import { useEffect, useState } from "react";
import ListCard from "../Components/ListCard";
import axios from "axios";
const List = () => {
  const [lat, setLat] = useState(38.5);
  const [long, setLong] = useState(21.5);
  const [data2, setData2] = useState([]);

  function renderMap(long, lat) {
    return <Map coords={[long, lat]} data2={data2} />;
  }

  useEffect(() => {
    renderMap(long, lat);
  }, [lat]);

  useEffect(() => {
    res();
  }, []);

  const res = async () => {
    await axios
      .get("http://localhost:8000/api/auth/getPosts")
      .then((response) => {
        setData2(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row">
        <div className="col-7">
          <div
            className="text-start mx-3"
            style={{ overflowY: "scroll", height: "100vh" }}
          >
            <ListComp />
            <div className="mt-4">
              {data2.map((d) => {
                return (
                  <div
                    key={d.title}
                    onClick={() => {
                      setLat(d.latitude);
                      setLong(d.longitude);
                    }}
                  >
                    <ListCard
                      img={d.images[0]}
                      title={d.title}
                      price={d.price}
                      bedrooms={d.bedroom}
                      bathrooms={d.bathroom}
                      address={d.address}
                      lat={d.latitude}
                      long={d.longitude}
                      images={d.images}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className=" col-5 border bg-warning bg-opacity-25 ">
          <ProfileNavbar />
          {/* <Map lat={lat} long={long}/>     */}
          {renderMap(lat, long)}
        </div>
      </div>
    </div>
  );
};

export default List;
