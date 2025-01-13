import Slider from "./Slider";
import Parser from "html-react-parser";
const SingleItemContent = (props) => {
  console.log("Details from content" + props.details.description);
  return (
    <div className="container">
      <Slider images={props.images} />
      <div className="d-flex mx-5">
        <div className="container d-flex flex-column gap-4">
          <div className="h1">{props.title}</div>
          <div className="d-flex p-2 gap-2">
            <i class="bi bi-geo-alt"></i>
            {props.address}
          </div>
          <div className="d-flex bg-warning justify-content-center rounded h6 align-items-center p-2 w-25">
            {props.price} $
          </div>
        </div>
        <div className="bg-warning bg-opacity-25 d-flex rounded justify-content-center px-4 py-3 mt-2 mx-5 d-flex flex-column gap-2">
          <div>
            <img
              src={props.details.avatar}
              style={{
                width: "100px",
                objectFit: "cover",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid black",
              }}
            />
          </div>
          <div className="text-center h5 mt-2">{props.details.username}</div>
        </div>
      </div>
      <div className="m-5">{Parser(String(props.details.description))}</div>
    </div>
  );
};

export default SingleItemContent;
