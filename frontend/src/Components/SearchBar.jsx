import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./styles.css";
const SearchBar = () => {
  const [buttons, setButtons] = useState(true);
  const [type, setType] = useState("Buy");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cities, setCities] = useState({});
  const [showCities, setShowCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [closePopUp, setClosepopUp] = useState(true);

  function layout1() {
    return (
      <div className="container d-flex flex-start mt-4 ">
        <div
          className="border rounded p-3 px-5 border-black bg-dark text-white"
          style={{ cursor: "pointer" }}
        >
          <b>Buy</b>
        </div>
        <div
          className="border rounded p-3 px-5 border-black "
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            setButtons(false);
            setType("Rent");
          }}
        >
          <b>rent</b>
        </div>
      </div>
    );
  }

  function layout2() {
    return (
      <div className="container d-flex flex-start mt-4 ">
        <div
          className="border rounded p-3 px-5 border-black "
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            setButtons(true);
            setType("Buy");
          }}
        >
          <b>Buy</b>
        </div>
        <div
          className="border rounded p-3 px-5 border-black bg-dark text-white"
          style={{ cursor: "pointer" }}
        >
          <b>rent</b>
        </div>
      </div>
    );
  }

  function checkLayouts() {
    console.log(type);
    if (buttons) {
      return layout1();
    } else {
      return layout2();
    }
  }

  function handleSubmit() {
    console.log(
      "Searched with params : " +
        city +
        " Min/Max price : " +
        minPrice +
        "/" +
        maxPrice +
        " type : " +
        type
    );
  }
  const findCity = (city) => {
    console.log(
      "From function : " + String(city[0]).toUpperCase() + String(city).slice(1)
    );
  };

  const getCities = async () => {
    await axios
      .get("http://localhost:8000/api/auth/getCities")
      .then((response) => {
        setCities(response.data);
      });
  };

  useEffect(() => {
    getCities();
    console.log(cities);
  }, []);
  let menuRef = useRef();
  useEffect(() => {
    // let handler = (event) => {
    //     setShowCities(false);
    // };
    // document.addEventListener("mousedown", handler);
    document.addEventListener("mousedown", (event) => {
      if (!menuRef.current.contains(event.target)) {
        setShowCities(false);
      }
    });
  });
  //height: calc(100vh - var(--nav-height));
  return (
    <div
      className="container  d-flex w-75 flex-column justify-content-center align-items-center text-center"
      style={{ height: "calc(100vh - 52px)" }}
    >
      <div className="h1 text-start display-4">
        <b>Find Real Estate And get your Dream place</b>
      </div>
      {/* <div className="text-start mt-4 text-center ">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry printer took a galley of type and scrambled it to make a type
          specimen book.
        </p>
      </div> */}
      {checkLayouts()}
      <div
        ref={menuRef}
        className="container d-flex bg-dark"
        style={{ height: "60px" }}
      >
        <input
          type="text"
          className="form-control mt-1"
          placeholder="City"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          onClick={() => setShowCities(true)}
        ></input>
        <input
          type="number"
          className="form-control mt-1"
          placeholder="Min Price"
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
        ></input>
        <input
          type="number"
          className="form-control mt-1"
          placeholder="Max Price"
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
        ></input>
        <div
          className="btn btn-success d-flex  align-items-center p-3 mx-2"
          onClick={handleSubmit()}
        >
          <i className="bi bi-search h3"></i>
        </div>
        {showCities ? (
          <div
            className="bg-dark"
            style={{
              position: "relative",
              maxHeight: "50px",
            }}
          >
            <div className="d-flex flex-column border popup">
              <div className="popupelement mt-3">city1</div>
              <div className="popupelement">city2</div>
              {cities.map((n) => {
                return (
                  <div
                    className="popupelement"
                    onMouseEnter={() => {
                      setClosepopUp(false);
                    }}
                    onMouseLeave={() => {
                      setClosepopUp(false);
                    }}
                    onClick={() => {
                      setSelectedCity(n.city);
                      console.log(n.city);
                    }}
                  >
                    {n.city}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      {/* test */}
      <div className="container w-75 d-flex justify-content-between mt-5">
        <div className="d-flex flex-column text-start">
          <div className="h2">
            <b>16+</b>
          </div>
          <div>
            <em>Years of Experince</em>
          </div>
        </div>
        <div className="d-flex flex-column text-start">
          <div className="h2">
            <b>200</b>
          </div>
          <div>
            <em>Award Gained</em>
          </div>
        </div>
        <div className="d-flex flex-column text-start">
          <div className="h2">
            <b>2000+</b>
          </div>
          <div>
            <em>Property Ready</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
