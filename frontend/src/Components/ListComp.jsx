import Navbar from "./Navbar";
import ListCard from "./ListCard";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { listData } from "../lib/dummydata";

const ListComp = () => {
  function renderCard(listItem) {}
  const data = listData;
  const [type, setType] = useState("Rent");
  const [property, setProperty] = useState("Apartment");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-5">
        <div className="display-6">
          Search Result for <b>Country</b>
        </div>
        <div>
          Test lat and long lat : {lat} long : {long}{" "}
        </div>
        <div className="mt-3">Location</div>
        <input
          className="form-control w-50 mt-2"
          type="text"
          value="London"
        ></input>
        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex flex-column">
            <div className="mx-3">Type</div>
            <DropdownButton
              className="mt-2"
              variant="light"
              id="dropdown-basic-button"
              title={type}
            >
              <Dropdown.Item
                onClick={(e) => {
                  setType("Rent");
                }}
              >
                Rent
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  setType("Buy  ");
                }}
              >
                Buy
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="mx-3">
            <div className="mx-3">Property</div>
            <DropdownButton
              className="mt-2"
              variant="light"
              id="dropdown-basic-button"
              title={property}
            >
              <Dropdown.Item
                onClick={(e) => {
                  setProperty("Apartment");
                }}
              >
                Apartment
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  setProperty("House");
                }}
              >
                House
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="mx-2">
            <div>Min</div>
            <input
              className="form-control mt-2"
              type="number"
              placeholder="1000"
            ></input>
          </div>
          <div className="mx-2">
            <div>Max</div>
            <input
              className="form-control mt-2"
              type="number"
              placeholder="1000"
            ></input>
          </div>
          <div className="mx-3">
            <div>Bedroom</div>
            <input
              className="form-control mt-2"
              type="number"
              placeholder="1"
            ></input>
          </div>
          <div>
            <div className="btn btn-success d-flex  align-items-center px-3 mx-2 mt-3">
              <i className="bi bi-search h3"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListComp;
