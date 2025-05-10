// src/pages/LandingPage.jsx
import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import NavBar from "../components/NavBar";
import MainContent from "../components/Content";
import "../styles/landing.css"
const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="d-flex">
      <Sidebar setActiveTab={setActiveTab} />
      
      <div className="flex-fill landing-page-content">
        <NavBar />
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default LandingPage;
