import React, { useEffect, useState } from "react";
import img from "../no_avatar.png";
import Image from "react-bootstrap/Image";
import axios from "axios";

function ChatBox(props) {
  const [close, setClose] = useState(false);
  const [message, setMessage] = useState("");
  const loadMessages = () => {
    console.log("Need to load messages");
  };
  const [chatid, setChatid] = useState();
  useEffect(() => {
    !close &&
      console.log(
        "Opened chat sender : " +
          props.userId +
          "Receiver : " +
          props.receiver +
          "chatid : " +
          props.chatid
      );
    loadMessages();
  }, [close]);
  if (close) return null;
  const handleClick = async () => {
    if (props.firstMessage) {
      console.log(
        "User with id: " +
          props.userId +
          "Trying to send first message to user with id: " +
          props.receiver +
          "Message : " +
          message
      );
      const result = await axios
        .post(`http://localhost:8000/api/auth/createChat`, {
          sender: props.userId,
          receiver: props.receiver,
          message: message,
        })
        .then((res) => {
          if (res.data.message === "Exists") {
            console.log("Chat exists with id : " + res.data.chatid);
            setChatid(res.data.chatid);
          } else {
            console.log("Creating chat with id  :" + res.data);
            setChatid(res.data);
          }
        });
    } else {
      console.log(
        "User with id: " +
          props.userId +
          "Trying to continue chat with user with id: " +
          props.receiver +
          "Message : " +
          message
      );
    }
  };

  return (
    <div
      className="chatbox d-flex flex-column border rounded"
      style={{ display: close ? "none" : "flex" }}
    >
      <div className="navbar bg-white d-flex justify-content-between gap-3 border">
        <div
          className="d-flex gap-3 mx-3 align-items-center"
          style={{ height: "40px" }}
        >
          <Image
            src={img}
            roundedCircle
            className="border border-black"
            style={{
              height: "40px",
              width: "40px",
              objectFit: "contain",
            }}
          ></Image>
          <div>
            <b>name id : {props.chatid && props.chatid}</b>
          </div>
        </div>
        <div
          className="mx-4"
          onClick={() => {
            setClose(true);
          }}
        >
          <b style={{ cursor: "pointer" }}>X</b>
        </div>
      </div>
      <div className="container content d-flex flex-column justify-content-between">
        <div>asd</div>
      </div>
      <div className="input mt-1 p-1 border" style={{ height: "40px" }}>
        <input
          className="form-control"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <div
          className="btn btn-outline-dark d-flex justify-content-center align-items-center"
          onClick={handleClick}
        >
          Send
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
