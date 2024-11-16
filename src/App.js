import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/Home";
import HotelDetailsComponent from "./components/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/details/:id" element={<HotelDetailsComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
