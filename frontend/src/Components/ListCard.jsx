import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
const ListCard = (props) => {
  return (
    <div
      className="card flex-row border my-4 custom-card mx-3"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <div className="card-image-left">
        <img
          className="p-1"
          style={{ borderRadius: "7%", width: "300px", height: "200px" }}
          src={props.img}
        />
      </div>
      <div className="d-flex flex-column mx-3 justify-content-between w-100">
        <div className="h5 mt-1 card-title">
          {console.log("+++++++++++" + props.images)}
          {props.redirect ? (
            <Link
              to={{ pathname: `/singleItem/${props.id}` }}
              state={{
                title: props.title,
                price: props.price,
                address: props.address,
                images: props.images,
                beds: props.bedroom,
                toilet: props.bathroom,
                lat: props.lat,
                long: props.long,
                postId: props.id,
                receiver: props.receiver,
              }}
            >
              {props.title}
            </Link>
          ) : (
            <div>{props.title}</div>
          )}
        </div>
        <div className="" style={{ fontWeight: "lighter" }}>
          <i class="bi bi-geo-alt"></i>
          {props.address}
        </div>
        <div className="bg-warning bg-opacity-50 w-50 rounded text-center w-25">
          <span className="h5">$ {props.price}</span>
        </div>

        <div className="mb-2 d-flex justify-content-between ">
          <div className="d-flex gap-2">
            <div className="border rounded px-2 bg-secondary bg-opacity-75">
              {props.bedrooms} bedroom
            </div>
            <div className="border rounded px-2 bg-secondary bg-opacity-75">
              {props.bathrooms} toilet
            </div>
          </div>
          <div className="d-flex gap-2">
            <div>a</div>
            <div>d</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
