import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="bg-warning d-flex justify-content-arround align-items-center gap-5"
      style={{ height: "50px" }}
    >
      <Link to="/">
        <div className="navbar-brand mx-5 fs-3">
          <i className="bi bi-bootstrap mx-2"></i>RealEstate
        </div>
      </Link>
      <div className="navbar-toggler">Home</div>
      <div>About</div>
      <div>Contact</div>
      <div>Agents</div>
    </div>
  );
};

export default Navbar;
