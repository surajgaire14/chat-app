import React from "react";
import { Routes, Route } from "react-router-dom";
import Join from "./Componensts/Join";
import Chat from "./Componensts/Chat";
import "./app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
