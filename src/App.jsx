import React from "react";
import { Routes, Route } from "react-router-dom";
import Details from "./components/Modal.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
