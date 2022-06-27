import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      navigate(`/chat?username=${username}&room=${room}`);
     
    }
  };

  return (
    <div className="App">
      <div className="joinChatContainer">
        <h3>Join Room</h3>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="roomid"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join a room</button>
      </div>
    </div>
  );
}

export default Join;
