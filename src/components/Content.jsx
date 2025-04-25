// src/components/MainContent.jsx
import React from "react";
import Home from "../components/Home";
import Chat from "../components/Chat";
import Games from "../components/Games";
import Activities from "../components/Activity";

const MainContent = ({ activeTab }) => {
  return (
    <div className="container-fluid p-4" style={{ marginRight: "250px" }}>
      {activeTab === "home" && <Home />}
      {activeTab === "chat" && <Chat />}
      {activeTab === "games" && <Games />}
      {activeTab === "activities" && <Activities />}
    </div>
  );
};

export default MainContent;
