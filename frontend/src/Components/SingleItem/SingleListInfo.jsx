import Map from "../map/Map.jsx";
import SingleItemMap from "../map/SingleItemMap.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "../ChatBox.jsx";
const SingleListInfo = (props) => {
  function renderMap(long, lat) {
    return (
      <SingleItemMap
        coords={[long, lat]}
        data2={[]}
        lat={props.lat}
        long={props.long}
      />
    );
  }
  const [chat, setChat] = useState(false);
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user).id;
  const [saved, setSaved] = useState(null);
  const [chatid, setChatid] = useState();
  const savePost = async (action) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/auth/savePost`, {
        userId: userId,
        postId: props.postId,
        action: action,
      });

      if (res.data.success) {
        setSaved(action === "save" ? true : false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfIsSaved = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/auth/checkIfSaved`,
        {
          userId: userId,
          postId: props.postId,
        }
      );

      if (res.data.message === "saved") {
        setSaved(true);
      } else {
        setSaved(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfIsSaved();
  }, []);

  const toggleSave = () => {
    if (saved === true) {
      savePost("remove");
    } else {
      savePost("save");
    }
  };

  const messageClicked = async () => {
    const c = !chat;
    setChat(c);
  };

  return (
    <div className="container">
      <h4 className="mt-5">General</h4>
      <div className="container d-flex flex-column bg-light rounded border mt-4">
        <div className="d-flex gap-3 mt-2">
          <div className="d-flex flex-column justify-content-center">
            <i className="bi bi-tools h4"></i>
          </div>
          <div className="d-flex flex-column">
            <div>
              <b>Utilities</b>
            </div>
            <div>{props.details.utilities}</div>
          </div>
        </div>
        <div className="d-flex gap-3 mt-4">
          <div className="d-flex flex-column justify-content-center">
            <i className="bi bi-tencent-qq h4"></i>
          </div>
          <div className="d-flex flex-column">
            <div>
              <b>Pet Policy</b>
            </div>
            <div>{props.details.pet}</div>
          </div>
        </div>
        <div className="d-flex gap-3 mt-4 mb-4">
          <div className="d-flex flex-column justify-content-center">
            <i class="bi bi-house-gear-fill h4"></i>
          </div>
          <div className="d-flex flex-column">
            <div>
              <b>Property Fees</b>
            </div>
            <div className="fs-6">{props.details.income}</div>
          </div>
        </div>
      </div>
      <div className="h4 mt-3">Room sizes</div>
      <div className="container d-flex justify-content-between  gap-4 mt-4">
        <div className="d-flex gap-2 align-items-center bg-light rounded border justify-content-center p-1">
          <div>
            <i class="bi bi-code-square h3"></i>
          </div>
          <div className="fs-5">{props.details.size}</div>
        </div>
        <div className="bg-light rounded border fs-5 d-flex justify-content-center align-items-center gap-2 p-1">
          <i class="bi bi-truck-flatbed h4"></i>
          {props.bedroom} Bedrooms
        </div>
        <div className="bg-light rounded border fs-5 d-flex align-items-center gap-2 justify-content-center p-1">
          <i class="bi bi-bezier h4"></i>
          {props.toilet} Toilets
        </div>
      </div>
      <div className="h4 mt-4">Nearby Places</div>
      <div className="container bg-light rounded border d-flex justify-content-between p-3 mt-4">
        <div className="m-2 d-flex gap-2 align-items-center">
          <i class="bi bi-building h4"></i>
          <div className="d-flex flex-column gap-0">
            <div className="h5 mb-0">School</div>
            <div className="">{props.details.school}m away</div>
          </div>
        </div>
        <div className="m-2 d-flex gap-2 align-items-center">
          <i class="bi bi-bus-front-fill h4"></i>
          <div className="d-flex flex-column gap-0">
            <div className="h5 mb-0">Bus Stop</div>
            <div className="">{props.details.bus}m away</div>
          </div>
        </div>
        <div className="m-2 d-flex gap-2 align-items-center">
          <i class="bi bi-egg-fried h4"></i>
          <div className="d-flex flex-column gap-0">
            <div className="h5 mb-0">Restaurant</div>
            <div className="">{props.details.restaurant}m away</div>
          </div>
        </div>
      </div>
      <div className="h4 mt-4">Location</div>
      <div className="mx-1 mt-3" style={{ height: "300px" }}>
        {renderMap(props.lat, props.long)}
        {props.lat} {props.long}
      </div>
      <div className="container d-flex justify-content-between my-5 ">
        <div
          className={`btn ${
            saved ? "btn-dark " : "btn-outline-dark "
          }p-4 d-flex gap-2 align-items-center`}
          style={{
            width: "200px",
            height: "70px",
          }}
          onClick={toggleSave}
        >
          <i class="bi bi-floppy h3"></i>
          <div className="h5">{saved ? "Place saved!" : "Save place"}</div>
        </div>
        <div
          className="btn btn-outline-dark align-items-center p-3 d-flex gap-2 justify-content-center"
          style={{
            width: "200px",
            height: "70px",
          }}
          onClick={messageClicked}
        >
          <i class="bi bi-chat-left h3 "></i>
          <div className="h5">Message</div>
        </div>
        {chat && (
          <div
            style={{
              position: "fixed",
              top: "0",
              bottom: "0",
              left: "55%",
              zIndex: "100000",
              width: "1rem",
            }}
          >
            <ChatBox
              firstMessage={true}
              userId={userId}
              receiver={props.receiver}
              chatid={chatid}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleListInfo;
