import React, { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Join from "./Componensts/Join";
import Chat from "./Componensts/Chat";
import "./app.scss";

export const userContext = createContext();

function App() {
  const socketRef = React.useRef();

  React.useEffect(() => {
    socketRef.current = io("http://localhost:5000",{
      transports:["websocket","polling"]
    })
  },[])

  return (
    // <userContext.Provider value={socketRef}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Join socketRef={socketRef} />} />
          <Route path="/chat" element={<Chat socketRef={socketRef} />} />
        </Routes>
      </div>
    // </userContext.Provider>
  );
}

export default App;
