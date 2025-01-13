import img from "../no_avatar.png";
import Image from "react-bootstrap/Image";
import "./styles.css";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
const Messages = ({ firstMessage, userId, receiver }) => {
  const [chat, setChat] = useState(false);

  function handleClick() {
    const c = !chat;
    setChat(c);
  }

  return (
    <div
      className="mt-4 rounded border border-black d-flex flex-column align-items-center"
      style={{ height: "88vh" }}
    >
      <h2>Messages</h2>
      <div
        className="container message border rounded border mt-4 d-flex align-items-center gap-4 bg-light"
        style={{ width: "80%", height: "70px" }}
        onClick={handleClick}
      >
        <Image
          src={img}
          roundedCircle
          className="border"
          style={{
            height: "60px",
            width: "60px",
            objectFit: "contain",
          }}
        ></Image>
        <div className="">
          <b>name</b>
        </div>
        <div style={{ fontWeight: "lighter" }}>message</div>
      </div>
      <div
        className="container message border rounded border mt-4 d-flex align-items-center gap-4 bg-light"
        style={{ width: "80%", height: "70px" }}
      >
        <Image
          src={img}
          roundedCircle
          className="border"
          style={{
            height: "60px",
            width: "60px",
            objectFit: "contain",
          }}
        ></Image>
        <div className="">
          <b>name</b>
        </div>
        <div style={{ fontWeight: "lighter" }}>message</div>
      </div>
      {chat && <ChatBox />}
    </div>
  );
};

export default Messages;
